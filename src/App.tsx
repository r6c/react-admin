import { BrowserRouter } from "react-router-dom";
import RenderRouter from "@/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  );
};

export default App;
