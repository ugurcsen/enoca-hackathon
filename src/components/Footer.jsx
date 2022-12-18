import Link from "next/link";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faHouse, faSearch} from "@fortawesome/free-solid-svg-icons";

export default function Footer({NavRef}) {
    return (
        <ul id={"footer_nav"} className={"footer-nav"}>
            <li className={NavRef === "/" ? "active": ""}>
                <Link href={"/"}>
                    <FontAwesomeIcon icon={faHouse} />
                    Home
                </Link>
            </li>
            <li className={NavRef === "/search" ? "active": ""}>
                <Link href={"/search"}>
                    <FontAwesomeIcon icon={faSearch} />
                    Search
                </Link>
            </li>
            <li className={NavRef === "/watch-list" ? "active": ""}>
                <Link href={"/watch-list"}>
                    <FontAwesomeIcon icon={faBookmark} />
                    Watch list
                </Link>
            </li>
        </ul>
    )
}