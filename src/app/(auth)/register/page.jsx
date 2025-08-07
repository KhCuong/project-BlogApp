
import styles from "./registerPage.module.css";
import SignupForm from "../../../components/auth/SignupForm";

export default function SignupPage() {
    return (
        <main className={styles.centerScreen}>
            <SignupForm />
        </main>
    );
}
