import React, {SyntheticEvent, useEffect, useState, FC} from 'react';
import IDetails from "../utils/interface/interface";

interface IProps{
    params: IDetails | undefined
}

const TickerItem: FC<IProps> = ({params}) => {
    const [difference, setDifference] = useState<number>(0)
    const [percent, setPercent] = useState<number>(0)

    useEffect(() => {
        if(params?.close && params?.open){
            setDifference(Math.round((params.close - params.open) * 100) / 100);
            if (difference > 0) setPercent(Math.round((params.close / params.open * 100 - 100) * 100) / 100);
            else setPercent(Math.round((100 - params.close / params.open * 100) * 100) / 100);
        }
    }, [difference, params])
    const handlerDefaultImg = (e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = "/images/search.svg"
    }
    return (
        <div className="card-ticker-item">
            <div className="company-icon"><img src={params?.logo} alt="logo" onError={handlerDefaultImg} width={94} height={120}/></div>
            <div className="company-name"><div>{params?.name}</div></div>
            <div className="company-selector">{params?.sector}</div>
            <div className="open-price">{params?.close} USD</div>
            {difference < 0 ? <div className="difference red-text">
                    <div>{difference} ({percent}%)</div>
                    <img src="/images/down-arrow.svg" alt="arrow"/>
                </div> :
                <div className="difference">
                    <div>+{difference} ({percent}%)</div>
                    <img src="/images/up-arrow.svg" alt="arrow"/>
                </div>}
        </div>
    );
};


export default TickerItem;