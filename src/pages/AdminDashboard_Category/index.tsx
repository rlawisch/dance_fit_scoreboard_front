import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";

interface AdminDashboardCategoryProps {}

const AdminDashboardCategory: FunctionComponent<
  AdminDashboardCategoryProps
> = () => {
  const navigate = useNavigate();

  const { event_id, category_id } = useParams();

  return (
    <GlobalContainer>
      <Button onClick={() => navigate(`/admin/events/${event_id}`)}>Voltar</Button>
    </GlobalContainer>
  );
};

export default AdminDashboardCategory;
