import React, {MouseEvent, SyntheticEvent, FC} from 'react'

interface myProps {
    list: any [],
    openTicker: (params: string) => void
}

const TickersList: FC<myProps> = ({list, openTicker}) => {

    const handlerOpenTicker = (e: MouseEvent<HTMLElement>): void => {
        openTicker(e.currentTarget.id)
    }
    const handlerDefaultImg = (e: SyntheticEvent<HTMLImageElement>): void => {
        e.currentTarget.onerror = null
        e.currentTarget.src = "/images/search.svg"
    }

    return (
        <div className="list-wrapper">
            {list.map(({symbol, name, industry, logo, amount}, index) => (
                <div onClick={handlerOpenTicker} key={symbol + index} id={symbol}
                     className={index === 0 ? "row-ticker" : "row-ticker border"}>
                    <div className="row-ticker-main">
                        <div>
                            <img src={logo} onError={handlerDefaultImg} alt="ticker logo" width={32} height={41}/>
                        </div>
                        <div className="row-ticker-text">
                            <div>{name}</div>
                            <div>{industry}</div>
                        </div>
                    </div>
                    <div className="row-amount">${amount.close}</div>
                </div>
            ))}
        </div>
    );
};

export default TickersList;