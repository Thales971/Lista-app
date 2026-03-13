import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
    const [novaTarefa, setNovaTarefa] = useState('');
    const [listatarefas, setlistaTarefas] = useState([]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '') return;
        const tarefaObjeto = {
            id: String(Date.now()),
            texto: novaTarefa,
        };
        setlistaTarefas([...listatarefas, tarefaObjeto]);
        setNovaTarefa('');
    };

    const removerTarefa = (idParaRemover) => {
        const listaFiltrada = listatarefas.filter((item) => item.id !== idParaRemover);
        setlistaTarefas(listaFiltrada);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Minhas Tarefas</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="O que vamos fazer hoje?"
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <Text style={styles.textoBotaoAdicionar}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={listatarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemLista}>
                        <Text style={styles.textoItem}>{item.texto}</Text>

                        <TouchableOpacity
                            style={styles.botaoRemover}
                            onPress={() => removerTarefa(item.id)}>
                            <Text style={styles.textoBotaoRemover}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.textoVazio}>Nenhuma tarefa adicionada. Você está livre!</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    botaoAdicionar: {
        width: 50,
        height: 50,
        backgroundColor: '#ff0000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textoBotaoAdicionar: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        marginBottom: 8,
    },
    textoItem: {
        fontSize: 16,
        color: '#333',
    },
    botaoRemover: {
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    textoBotaoRemover: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textoVazio: {
        textAlign: 'center',
        color: '#666',
        marginTop: 16,
    },
});
