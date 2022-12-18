import {useEffect, useState} from "react";
import {useRouter} from "next/router";

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
            </form>
        </div>
    )
}