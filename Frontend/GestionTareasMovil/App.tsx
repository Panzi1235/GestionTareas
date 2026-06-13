import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';

type Tarea = {
    id: number;
    titulo: string;
    descripcion: string;
    prioridad: string;
    estado: string;
    fechaCreacion: string;
};

const API_URL = 'http://10.0.2.2:5003/api/Tareas';

export default function App() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [estadoFiltro, setEstadoFiltro] = useState(null);
    const [prioridadFiltro, setPrioridadFiltro] = useState(null);

    const listarTareas = async () => {
        try {
            setCargando(true);
            const respuesta = await axios.get<Tarea[]>(API_URL);
            setTareas(respuesta.data);
            setTareaSeleccionada(null);
        } catch (error) {
            console.log('Error al listar tareas:', error);
        } finally {
            setCargando(false);
        }
    };

    const filtrarTareas = async () => {
        try {
            setCargando(true);

            const respuesta = await axios.get<Tarea[]>(`${API_URL}/filtro`, {
                params: {
                    estado: estadoFiltro,
                    prioridad: prioridadFiltro,
                },
            });

            setTareas(respuesta.data);
            setTareaSeleccionada(null);
        } catch (error) {
            console.log('Error al filtrar tareas:', error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerDetalle = async (id: number) => {
        try {
            setCargando(true);
            const respuesta = await axios.get<Tarea>(`${API_URL}/${id}`);
            setTareaSeleccionada(respuesta.data);
        } catch (error) {
            console.log('Error al obtener detalle:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        listarTareas();
    }, []);

    return (
        <SafeAreaView style={styles.contenedor}>
            <Text style={styles.titulo}>Gestión de Tareas</Text>

            <View style={styles.filtros}>
                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        estadoFiltro === 'Pendiente' && styles.botonActivo,
                    ]}
                    onPress={() => setEstadoFiltro('Pendiente')}>
                    <Text style={styles.textoFiltro}>Pendiente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        estadoFiltro === 'En Proceso' && styles.botonActivo,
                    ]}
                    onPress={() => setEstadoFiltro('En Proceso')}>
                    <Text style={styles.textoFiltro}>En Proceso</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        estadoFiltro === 'Completada' && styles.botonActivo,
                    ]}
                    onPress={() => setEstadoFiltro('Completada')}>
                    <Text style={styles.textoFiltro}>Completada</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filtros}>
                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        prioridadFiltro === 'Alta' && styles.botonActivo,
                    ]}
                    onPress={() => setPrioridadFiltro('Alta')}>
                    <Text style={styles.textoFiltro}>Alta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        prioridadFiltro === 'Media' && styles.botonActivo,
                    ]}
                    onPress={() => setPrioridadFiltro('Media')}>
                    <Text style={styles.textoFiltro}>Media</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.botonFiltro,
                        prioridadFiltro === 'Baja' && styles.botonActivo,
                    ]}
                    onPress={() => setPrioridadFiltro('Baja')}>
                    <Text style={styles.textoFiltro}>Baja</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.acciones}>
                <TouchableOpacity style={styles.botonPrincipal} onPress={filtrarTareas}>
                    <Text style={styles.textoBoton}>Filtrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonSecundario} onPress={listarTareas}>
                    <Text style={styles.textoBoton}>Limpiar</Text>
                </TouchableOpacity>
            </View>

            {cargando && <ActivityIndicator size="large" />}

            {tareaSeleccionada && (
                <View style={styles.detalle}>
                    <Text style={styles.subtitulo}>Detalle de tarea</Text>
                    <Text style={styles.detalleTitulo}>{tareaSeleccionada.titulo}</Text>
                    <Text>{tareaSeleccionada.descripcion}</Text>
                    <Text>Prioridad: {tareaSeleccionada.prioridad}</Text>
                    <Text>Estado: {tareaSeleccionada.estado}</Text>
                </View>
            )}

            <FlatList
                data={tareas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.tarjeta}
                        onPress={() => obtenerDetalle(item.id)}>
                        <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
                        <Text>{item.descripcion}</Text>

                        <View style={styles.etiquetas}>
                            <Text style={styles.etiqueta}>{item.prioridad}</Text>
                            <Text style={styles.etiqueta}>{item.estado}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f6f8',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1f2937',
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    filtros: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    botonFiltro: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
    },
    botonActivo: {
        backgroundColor: '#2563eb',
    },
    textoFiltro: {
        color: '#111827',
        fontWeight: '600',
    },
    acciones: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },
    botonPrincipal: {
        flex: 1,
        backgroundColor: '#16a34a',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonSecundario: {
        flex: 1,
        backgroundColor: '#6b7280',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
    },
    tarjeta: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2,
    },
    tarjetaTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    etiquetas: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 10,
    },
    etiqueta: {
        backgroundColor: '#dbeafe',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontWeight: '600',
    },
    detalle: {
        backgroundColor: '#fff7ed',
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
    },
    detalleTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
});