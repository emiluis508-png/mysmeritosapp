import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, StatusBar, Platform, ScrollView } from 'react-native';

export default function App() {
  const [graves, setGraves] = useState('');
  const [leves, setLeves] = useState('');
  const [coef, setCoef] = useState('0.0445');
  const [resultado, setResultado] = useState('neutro');
  const [multExtra, setMultExtra] = useState('1');

  const multiplicador = useMemo(() => {
    if (resultado === 'victoria') return 1.05;
    if (resultado === 'derrota') return 0.95;
    return 1;
  }, [resultado]);

  const total = useMemo(() => (Number(graves) || 0) + (Number(leves) || 0), [graves, leves]);
  const meritos = useMemo(() => total * (Number(coef) || 0) * multiplicador * (Number(multExtra) || 1), [total, coef, multiplicador, multExtra]);
  const fmt = (n) => new Intl.NumberFormat('es-ES').format(Math.round(n));

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle={Platform.OS==='ios'?'dark-content':'default'} />
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.title}>MySMéritosApp</Text>

        <View style={s.card}>
          <Label t="Gravemente herida" />
          <Input val={graves} set={setGraves} ph="69107" />
          <Label t="Levemente herida" />
          <Input val={leves} set={setLeves} ph="450568" />
          <Label t="Coeficiente" />
          <Input val={coef} set={setCoef} ph="0.0445" />
          <Text style={s.hint}>Sugerido: 0.0445</Text>
        </View>

        <View style={s.card}>
          <Text style={s.label}>Multiplicadores</Text>
          <View style={s.row}>
            <Btn l="Victoria 1.05×" a={resultado==='victoria'} f={()=>setResultado('victoria')} />
            <Btn l="Neutro 1×" a={resultado==='neutro'} f={()=>setResultado('neutro')} />
            <Btn l="Derrota 0.95×" a={resultado==='derrota'} f={()=>setResultado('derrota')} />
          </View>
          <Label t="Multiplicador extra" />
          <Input val={multExtra} set={setMultExtra} ph="1" />
        </View>

        <View style={s.card}>
          <Row k="Total heridos" v={fmt(total)} />
          <Row k="Coeficiente" v={(+coef).toFixed(4)} />
          <Row k="Mult. resultado" v={multiplicador.toFixed(2)+'×'} />
          <Row k="Mult. extra" v={(+multExtra).toFixed(2)+'×'} />
          <View style={s.divider}/>
          <View style={s.resRow}>
            <Text style={s.resLabel}>Méritos estimados</Text>
            <Text style={s.resVal}>{fmt(meritos)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Label = ({t}) => <Text style={s.label}>{t}</Text>;
const Input = ({val,set,ph}) => <TextInput style={s.input} value={val} onChangeText={set} placeholder={ph} keyboardType='number-pad' />;
const Row = ({k,v}) => <View style={s.rowB}><Text style={s.k}>{k}</Text><Text style={s.v}>{v}</Text></View>;
const Btn = ({l,a,f}) => <Pressable onPress={f} style={[s.btn,a&&s.btnA]}><Text style={[s.btnT,a&&s.btnTA]}>{l}</Text></Pressable>;

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f6f7fb'},container:{padding:16,gap:16},
  title:{fontSize:24,fontWeight:'700',textAlign:'center'},
  card:{backgroundColor:'#fff',padding:16,borderRadius:16,elevation:2},
  label:{fontSize:14,fontWeight:'500',marginBottom:4},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:12,padding:10,fontSize:16,marginBottom:12},
  row:{flexDirection:'row',gap:6,flexWrap:'wrap'},
  rowB:{flexDirection:'row',justifyContent:'space-between',paddingVertical:4},
  k:{fontSize:14,color:'#444'},v:{fontSize:15,fontWeight:'600'},
  divider:{height:1,backgroundColor:'#eee',marginVertical:8},
  resRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'},
  resLabel:{fontSize:16},resVal:{fontSize:28,fontWeight:'700'},
  btn:{padding:8,borderWidth:1,borderRadius:12,borderColor:'#bbb',backgroundColor:'#fff'},
  btnA:{backgroundColor:'#e8f5e9',borderColor:'#34a853'},
  btnT:{fontSize:13},btnTA:{color:'#166534',fontWeight:'600'},
  hint:{fontSize:12,color:'#777'}
});