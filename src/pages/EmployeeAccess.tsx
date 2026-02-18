import ImageCard from '../components/ImageCard';
import ButtonLink from '../components/ButtonLink';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { saveStudent, saveBook } from '../functions';

function EmployeeAccess() {
    const [login, setLogin] = useState(false);
    const [registerStudent, setRegisterStudent] = useState(false);
    const [registerBook, setRegisterBook] = useState(false);

    const handleLogin = () => {
      // Placeholder for actual login logic
      setLogin(true);
    };

    const handleRegisterStudent = () => {
      saveStudent();
      setRegisterStudent(false);
    };

    const handleRegisterBook = () => {
      saveBook();
      setRegisterBook(false);
    };

    return (<>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Bibliotech Library
            </p>
            {!login ? 
            <><h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Employee Access
            </h1>
            <p className="max-w-lg text-base text-slate-200/90">
              Select the option you want to do.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Employee ID" placeholder="Enter employee ID" />
                <InputField label="Password" placeholder="Enter employee password" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Login" onClick={() => {handleLogin()}} />
            </div></> 
            : registerStudent ? 
            <>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Register new Student
            </h1>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Student Name" placeholder="Enter student name" />
                <InputField label="Student ID" placeholder="Enter student ID" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Email" placeholder="Enter student email" />
                <InputField label="Course" placeholder="Enter student course" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Password" placeholder="Enter student password" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => setRegisterStudent(false)} text="Back" />
              <Button onClick={() => handleRegisterStudent()} text="Register" />
            </div>
            </>
            : registerBook ?
            <>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Register new Book
            </h1>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Book Title" placeholder="Enter book title" />
                <InputField label="Book Barcode" placeholder="Enter book barcode" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <InputField label="Author" placeholder="Enter book author" />
                <InputField label="Category" placeholder="Enter book category" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button onClick={() => setRegisterBook(false)} text="Back" />
              <Button onClick={() => handleRegisterBook()} text="Register" />
            </div>
            </>
            : 
            <><h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Employee Access
            </h1>
            <p className="max-w-lg text-base text-slate-200/90">
              Select the option you want to do.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <ButtonLink to="/employee" text="View students" />
              <ButtonLink to="/employee" text="View books" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <ButtonLink to="/employee" text="View borrowings" />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Register new student" onClick={() => setRegisterStudent(true)} />
              <Button text="Register new book" onClick={() => setRegisterBook(true)} />
            </div></>}
          </div>
          <div className="flex justify-end">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </>)
}

export default EmployeeAccess;