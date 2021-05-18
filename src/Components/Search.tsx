import React, {ChangeEvent, FC} from 'react'
import {DebounceInput} from 'react-debounce-input'

interface myProps {
    searchParams: (params: string) => void
}

const Search: FC<myProps> = ({searchParams}) => {

    const setSubmit = (params: string): void => {
        if (params) searchParams(params)
    }
    return (
        <div className='search-input'>
            <div className='search-logo'>
                <img src="/images/search.svg" alt="search-img"/>
            </div>
            <DebounceInput
                minLength={1}
                debounceTimeout={1000}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setSubmit(event.target.value);
                }}/>
        </div>
    );
};

export default Search;