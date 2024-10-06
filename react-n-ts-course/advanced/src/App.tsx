import { useRef } from "react";
import Button from "./components/Button";
import Form, { FormHandle } from "./components/Form";
import Input from "./components/Input";

function App() {

  const formRef = useRef<FormHandle>(null);

  const onSave = (data: unknown) => {

    // type casting or type assertion
    // const extractedData = data as {name: string, age: string};

    // or type guards
    if (
      !data || 
      typeof data !== 'object' ||
      !('name' in data) || 
      !('age' in data)
    )
      return;

    console.log(data);

    formRef.current?.clear();
  };

  return <main>
    <Form onSave={onSave} ref={formRef}>
      <Input id="name" label="Name" type="text" />
      <Input id="age" label="Age" type="number" />
      <Button el="button">Submit</Button>
    </Form>
  </main>
}

export default App;
