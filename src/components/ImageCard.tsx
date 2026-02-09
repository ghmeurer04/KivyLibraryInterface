interface Props{
    image: string;
}

function ImageCard({ image }: Props) {
    return (<>
        <div className="h-[480px] w-full max-w-md overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-emerald-950/40 md:h-[520px]">
            <img
                src={image}
                className="h-full w-full object-cover"
            />
        </div>
    </>)
}

export default ImageCard;