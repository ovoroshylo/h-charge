import styles from "../styles/Layout.module.css"
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import AdminLoginModal from "./modals/AdminLoginModal"
const Layout = ({children,pageProps}) => {
    const router = useRouter()
    const [loggedIn,setLoggedIn] = useState(true)

    useEffect(()=>{
        if(router.route == "/admin" ||router.route == "/admin/createnews" ){
            if(!localStorage.getItem("isLoggedIn"))
                setLoggedIn(false)
        }
    },[router.route])

    return (
        <div>
            <meta charset="UTF-8" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.css" />
            <link rel="stylesheet" href="/assets/font-awesome/css/fontawesome.min.css"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.js"></script>
            <div className={styles.container}>
                {loggedIn && 
                    <>
                        {children}
                        <div className="cover-absolute"></div>
                    </>
                }
                {!loggedIn && <AdminLoginModal setLoggedIn={setLoggedIn}/>}

            </div>
        </div>
    )
}

export default Layout