import { Link } from 'react-router-dom'

interface Props{
    to: string;
    text: string;
}

function ButtonLink({ to, text }: Props) {
    return  <Link
                to={to}
                className="inline-flex items-center justify-center rounded-full bg-emerald-300 px-8 py-3 text-lg font-semibold transition hover:bg-emerald-200"
                style={{ color: 'black' }} >
                {text}
            </Link>
}

export default ButtonLink;