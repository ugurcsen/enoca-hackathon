import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faChevronLeft, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

export default function Header({text, bookmark, info}) {
    const router = useRouter()

    return (
        <div className="container header-nav">
            <div className="row">
                <div className="col-3">
                    <span onClick={() => router.back()}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                </div>
                <div className="col-6">{text}</div>
                <div className="col-3">
                    {info?<FontAwesomeIcon icon={faCircleInfo}/>:null}
                    {bookmark?<FontAwesomeIcon icon={faBookmark}/>:null}
                </div>
            </div>
        </div>
    )
}