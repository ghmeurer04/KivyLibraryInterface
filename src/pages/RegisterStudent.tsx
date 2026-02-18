import InputField from '../components/InputField';
import Button from '../components/Button';

interface Props{
    backClick: () => void;
    registerClick: () => void;
}

function RegisterStudent({ backClick, registerClick }: Props) {
    return (
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
              <Button onClick={() => backClick()} text="Back" />
              <Button onClick={() => registerClick()} text="Register" />
            </div>
            </>
    )
}

export default RegisterStudent;