import React, {useEffect, useState, FC} from 'react';

interface IModal {
    status: number | null
}

const ErrorModal: FC<IModal> = ({status}) => {
    const [name, setName] = useState<string>('')
    const [text, setText] = useState<string>('')

    useEffect(() => {
        switch (status) {
            case 404:
                setName('Error 404')
                setText('Not found, please enter a different value!')
                break;
            case 429:
                setName('Error count of request')
                setText('Number of requests exceeded please retry after 1 minute!')
                break;
            default:
                setText('Error undefined!')
        }
    }, [status])

    return (
        <div className="list-wrapper">
            <div className="row-error">
                <div className="row-ticker">{name}</div>
                <div className="row-ticker border">{text}</div>
            </div>

        </div>
    );
};

export default ErrorModal;