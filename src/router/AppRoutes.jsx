import {Routes, Route} from "react-router-dom";
import routesConfig from "./routesConfig.js";


const AppRoutes = () => {

  return(
      <Routes>
        {routesConfig.map(({path, component: Component})=>(
            <Route
                key={path}
                path={path}
                element={<Component/>}>
            </Route>
        ))}
      </Routes>
  )
}

export default AppRoutes;