import React, {FC, useCallback, useEffect, useState} from 'react'
import Search from "./Search"
import TickersList from "./TickersList"
import TickerItem from "./TickerItem"
import {gettingTickerParams, searchTickers, gettingAmount} from '../utils/api/tickers'
import Spinner from "./Spinner"
import ErrorModal from "./ErrorModal"
import IDetails from "../utils/interface/interface";

const Main: FC = () => {
    const [searchList, setSearchList] = useState<string []>([])
    const [isLoader, setIsLoader] = useState<boolean>(false)
    const [listApi, setListApi] = useState<any []>([])
    const [isTickerCard, setIsTickerCard] = useState<boolean>(false)
    const [details, setDetails] = useState<IDetails | undefined>(undefined)
    const [modal, setModal] = useState<number | null>(null)

    const tickersNameArray = async (params: string) => {
        setModal(null)
        setIsLoader(true)
        setIsTickerCard(false)
        setSearchList([])
        setListApi([])
        if (!params || '') {
            return false;
        }
        try {
            const {data: {tickers, count} = {}} = await searchTickers(params);
            let array = tickers.map(item => item.ticker)
            setSearchList(array.slice(0, 4))  //we shorten the search results due to the limitation on api requests!!!
            if (count === 0) {
                setModal(404)
            }
            setIsLoader(false)
        } catch (e) {
            console.error(e)
        }
    }

    const gettingPromiseTicker = useCallback(async (item: string) => {
        try {
            const detailResponse = await gettingTickerParams(item);
            const amountResponse = await gettingAmount(item);
            if (detailResponse && amountResponse) {
                setModal(null);
                setListApi(prevState => [...prevState, { ...detailResponse, amount: amountResponse }]);
            }
        } catch (e) {
            if (listApi.length === 0 ) setModal(e.request.status)
        }
    }, [listApi.length]);

    useEffect(() => {
        searchList.map(item => gettingPromiseTicker(item));
    }, [searchList, gettingPromiseTicker])

    const openTickerItem = (params: string) => {
        setIsTickerCard(true)
        const text = listApi.find(i => i.symbol === params)
        setDetails({
            name: text.name,
            sector: text.sector,
            logo: text.logo,
            open: text.amount.open,
            close: text.amount.close
        })
    }

    return (
        <div>
            <Search searchParams={tickersNameArray}/>
            {isLoader && <Spinner/>}
            {isTickerCard ? <TickerItem params={details}/> :
                (modal && listApi.length === 0 ? <ErrorModal status={modal}/> :
                    <TickersList list={listApi} openTicker={openTickerItem}/>)}
        </div>
    );
}

export default Main;