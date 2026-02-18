import ImageCard from '../components/ImageCard';
import Button from '../components/Button';
import { accessCamera } from '../functions';
import ButtonLink from '../components/ButtonLink';
import { useState } from 'react';
import Video from '../components/Video';
import InputField from '../components/InputField';

function StudentAccess() {
    const [login, setLogin] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);

    const handleBorrow = async () => {
      const code = await accessCamera();
      if (!code) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    };

    const handleReturn = async () => {
      const code = await accessCamera();
      if (!code) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    };

    const handleLogin = () => {
      // Placeholder for actual login logic
      setLogin(true);
      setCameraActive(true);
    };

    return (!login ? <>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Bibliotech Library
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Student Access
            </h1>
            <p className="max-w-lg text-base text-slate-200/90">
              Select the option you want to do.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Student ID" placeholder="Enter student ID" />
                <InputField label="Password" placeholder="Enter student password" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Login" onClick={() => {handleLogin()}} />
            </div>
          </div>
          <div className="flex justify-end">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </> : 
    <>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Bibliotech Library
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Student Access
            </h1>
            <p className="max-w-lg text-base text-slate-200/90">
              Select the option you want to do.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Borrow" onClick={() => {handleBorrow()}} />
              <Button text="Return book" onClick={() => {handleReturn()}} />
              <ButtonLink to="/student" text="View my books" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {cameraActive && <Video />}
            </div>
          </div>
          <div className="flex justify-end">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </>)
}

export default StudentAccess;
