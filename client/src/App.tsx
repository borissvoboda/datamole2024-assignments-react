import { useState } from "react";
import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";

export const App = () => {
    const [todos, setTodos] = useState<{ t: number; d: number }>({ t: 0, d: 0 });

    const handleCounter = (t: number, d: number) => {
        setTodos({ t, d });
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                    <List onTodosChange={handleCounter} />
                    <Footer todoItems={todos.t} doneItems={todos.d} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
