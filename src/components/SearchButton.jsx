import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function SearchButton({text, onSubmit}) {
    const {query} = useRouter()
    const [value, setValue] = useState("")

    useEffect(()=> {
        if (query.s !== undefined) {
            setValue(query.s)
        }
    }, [query])

    return (
        <div className="search-area">
            {text !== undefined ? (<h3>{text}</h3>) : ""}
            <form onSubmit={onSubmit}>
                <input placeholder="Search" defaultValue={value} name="s" className="form-control search-input"/>
                <FontAwesomeIcon icon={faSearch} />
            </form>
        </div>
    )
}