import ImageCard from './components/ImageCard';
import { useState } from 'react';
import Button from './components/Button';
import { saveStudent, saveBook } from './functions';
import { accessCamera } from './functions';
import Header from './components/Header';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterBook from './pages/RegisterBook';
import Table from './components/Table';

function EmployeeAccess() {
    const [login, setLogin] = useState(false);
    const [registerStudent, setRegisterStudent] = useState(false);
    const [registerBook, setRegisterBook] = useState(false);
    const [tableStudent, setTableStudent] = useState(false);
    const [tableBook, setTableBook] = useState(false);
    const [tableBorrowing, setTableBorrowing] = useState(false);

    const table = ['teste','teste2','teste3']
    const table2 = [['teste4','teste5','teste6'],['teste7','teste8','teste9']]

    const handleLogin = () => {
      // Placeholder for actual login logic
      setLogin(true);
    };

    const handleRegisterStudent = () => {
      saveStudent();
      setRegisterStudent(false);
    };

    const handleBookBarcode = async () => {
      const code = await accessCamera();
      if (!code) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    }

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
            <> <Header headerText="Employee Access" paragraphText="Please enter your employee ID and password to access the library system." />
            <Login usernameLabel="Employee ID" usernamePlaceholder="Enter employee ID" passwordLabel="Password" passwordPlaceholder="Enter employee password" onClick={() => {handleLogin()}} />
            </> 
            : registerStudent ? 
            <RegisterStudent backClick={() => setRegisterStudent(false)} registerClick={() => handleRegisterStudent()} />
            : registerBook ?
            <RegisterBook scanBookBarcode={() => handleBookBarcode()} backClick={() => setRegisterBook(false)} registerClick={() => handleRegisterBook()} />
            : tableStudent ?
            <><Header headerText="Students" paragraphText="List of all students registered in the system." />
            <Table tableColumns={table} tableContent={table2} />
            <Button text="Back" onClick={() => setTableStudent(false)} /></>
            : tableBook ?
            <><Header headerText="Books" paragraphText="List of all books registered in the system." />
            <Table tableColumns={table} tableContent={table2} />
            <Button text="Back" onClick={() => setTableBook(false)} /></>
            : tableBorrowing ?
            <><Header headerText="Borrowings" paragraphText="List of all borrowings registered in the system." />
            <Table tableColumns={table} tableContent={table2} />
            <Button text="Back" onClick={() => setTableBorrowing(false)} /></>
            :
            <><Header headerText="Employee Access" paragraphText="Select the option you want to do." />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="View students" onClick={() => setTableStudent(true)} />
              <Button text="View books" onClick={() => setTableBook(true)} />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="View borrowings" onClick={() => setTableBorrowing(true)} />
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