interface Props{
    headerText: string;
    paragraphText: string;
}
function Header({headerText, paragraphText}: Props) {
    return (
        <>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              {headerText}
            </h1>
            <p className="max-w-lg text-base text-slate-200/90">
              {paragraphText}
        </p>
        </>
    );
}

export default Header;