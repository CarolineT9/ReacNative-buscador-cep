import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import api from "./src/server/api"; // Supondo que 'api' seja um arquivo de funções de requisição

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null); // Agora, o estado 'cepUser' será verificado antes de renderizar os dados

  // Função para limpar o campo de cep e também o resultado da busca
  function limpar() {
    setCep('');
    setCepUser(null); // Limpa o estado 'cepUser' também
  }

  // Função para buscar o CEP na API
  async function buscar() {
    if (cep === '') {
      alert('Digite um CEP válido!');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`); // Faz a requisição para a API
      console.log(response.data);
      setCepUser(response.data); // Atualiza o estado com os dados do CEP
    } catch (error) {
      console.log(`ERROR: ${error}`);
      alert('Erro ao buscar o CEP. Tente novamente.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o texto desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 7825452"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          onPress={buscar}
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && ( // Condicional para renderizar os dados apenas quando 'cepUser' não for nulo
        <View style={styles.resultado}>
          <Text style={styles.itemText}>Cep: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text> {/* Usei 'localidade' no lugar de 'cidade' */}
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text> {/* Usei 'uf' no lugar de 'estado' */}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  text:{
    margin: 25,
    fontSize: 25,
    fontWeight: 'bold'
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ff000',
  },
  botaoText: {
    fontSize: 22,
    color: '#fff',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
