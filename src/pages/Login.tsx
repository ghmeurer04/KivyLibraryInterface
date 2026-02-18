import Button from '../components/Button';
import InputField from '../components/InputField';

interface Props{
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    onClick: () => void;
}

function Login({usernameLabel, usernamePlaceholder, passwordLabel, passwordPlaceholder, onClick}: Props) {
    return (<>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label={usernameLabel} placeholder={usernamePlaceholder} />
                <InputField label={passwordLabel} placeholder={passwordPlaceholder} />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Login" onClick={() => {onClick()}} />
            </div></>)
}

export default Login;