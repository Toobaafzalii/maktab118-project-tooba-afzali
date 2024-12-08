import { AppInput } from "../../atoms/appInput";
import MagnifyingGlass from "../../../../public/svg/MagnifyingGlass.svg";

const AppSearchBar: React.FC = () => {
  return (
    <AppInput
      sizing="sm"
      type="text"
      id="searchBar"
      addon={"جستجو"}
      placeholder="جستجوی نام مشتری"
      rightIcon={(className) => <MagnifyingGlass className={className} />}
    />
  );
};

export default AppSearchBar;
