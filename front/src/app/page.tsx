import { Button } from "flowbite-react";
import NavbarComp from "./components/navbar/NavbarComp";

const Home = () => {
  return (
    <>
      <NavbarComp />
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button color="blue">Blue</Button>
        <Button color="gray">Gray</Button>
        <Button color="dark">Dark</Button>
        <Button color="light">Light</Button>
        <Button color="success">Success</Button>
        <Button color="failure">Failure</Button>
        <Button color="warning">Warning</Button>
        <Button color="purple">Purple</Button>
      </div>
    </>
  );
};

export default Home;
