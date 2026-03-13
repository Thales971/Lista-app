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
                    <Text style={styles.textoVazio}>
                        Nenhuma tarefa adicionada. Você está livre!
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 60,
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
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    botaoAdicionar: {
        width: 50,
        height: 50,
        backgroundColor: '#d80000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textoBotaoAdicionar: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemLista: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    textoItem: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    botaoRemover: {
        backgroundColor: '#FF3B30',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotaoRemover: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    textoVazio: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 30,
    },
});
