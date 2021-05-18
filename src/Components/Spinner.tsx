import React, {FC} from 'react'
import Loader from "react-loader-spinner"

const Spinner: FC = () => {
    return (
        <div className="loader">
            <Loader
                type="Circles"
                color="#728BA3"
                height={50}
                width={50}
            />
        </div>
    );
};

export default Spinner;