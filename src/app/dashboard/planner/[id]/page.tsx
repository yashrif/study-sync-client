type Props = {
  params: {
    id: string;
  };
};

const PlannerDetails: React.FC<Props> = ({ params: { id } }) => {
  return <div>{id}</div>;
};

export default PlannerDetails;
