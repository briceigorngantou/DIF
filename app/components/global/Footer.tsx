import {NextPage} from "next"
import { useTranslation } from "next-i18next";

export const Footer: NextPage = () => {
    return (
        <footer style={{
            height: 100,
            width: '100%'
        }}>
            <div className="difContainer">
                <p>&copy; Digital Innovation Festival. All rights reserved</p>
            </div>
        </footer>
    )
}
