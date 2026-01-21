interface CardInfoProps {
  title: string;
  subtitle: string;
}

function CardInfo(props: CardInfoProps) {
  const { title, subtitle } = props;
  return (
    <>
      <div className="card border-1 border-black rounded-0">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle}</h6>
        </div>
      </div>
    </>
  );
}

export default CardInfo;
