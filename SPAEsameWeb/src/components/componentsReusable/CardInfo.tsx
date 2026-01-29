interface CardInfoProps {
  title: string;
  subtitle: string;
}

function CardInfo(props: CardInfoProps) {
  const { title, subtitle } = props;
  return (
    <>
      <div className="card border-2 border-white rounded-0 bg-black" >
        <div className="card-body bg-black">
          <h5 className="card-title text-white">{title}</h5>
          <h6 className="card-subtitle mb-2 fs-5 mt-1 text-body-secondary">{subtitle}</h6>
        </div>
      </div>
    </>
  );
}

export default CardInfo;
