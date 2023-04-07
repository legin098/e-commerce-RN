import { useColorScheme } from "react-native";
import Root from "./src/navigation/Root";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  const theme = useColorScheme();

  return (
    <Provider store={store}>
      <Root colorScheme={theme!} />
    </Provider>
  );
}
