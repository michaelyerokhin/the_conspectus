import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import  { View, Text, TextInput , Pressable, StyleSheet} from "react-native"; 

export default function KnowledgeGraphScreen() {

    const  [input, setInput] = useState("Jesen Huang , Sam Altman")
    
    return(

     <View style={styles.container}>
        <Text style ={styles.title}> Knowledge Graph </Text>
        <Text style = {styles.subtitle}>
            Explore leaders through knowledge graph relationships and worldview analysis.
        </Text>
        {/*Tabs*/}

        <View style = {styles.tabRow}>
            <Pressable style={[styles.tab, styles.activeTab]}>
                <Text style = {styles.activeTabText}> Graph </Text>
            </Pressable>

            <Pressable style = {styles.tab}>
                <Text  style = {styles.tabText}> Structured Search </Text>
            </Pressable>

            <Pressable style = {styles.tab}>
                <Text style = {styles.tabText}> Knowledge Graph Search </Text>
            </Pressable>

            <Pressable style  = {styles.tab}>
                <Text  style  = {styles.tabText} > Situation Room</Text>
                </Pressable>
        </View>

        <TextInput
        style= {styles.input}
        value = {input}
        onChangeText = {setInput}
        placeholder ="Enter Names"
        />
        <Text style ={styles.logInText}>
            <Text style= {{fontWeight : "600"}}>Log In </Text> to add yourself to the chart
            </Text>

        <Pressable style={styles.button}>
            <Text style= {styles.buttonText}> Load Radar Chart </Text> 
        </Pressable>
     </View>
    ); 
}

    const styles = StyleSheet.create({

        container: {
            flex: 1 ,
            paddingHorizontal: 20,
            paddingTop:  60 ,
            backgroundColor: "fff",

        },

        title: {
            fontSize:  28,
            fontWeight: "700",
            color: "#111",
            marginBottom: 6 , 

        },
        subtitle: {
            color: "6b7280",
            marginBottom: 20, 
            fontSize:  15, 
        },
        tabRow: {
            flexDirection:"row", 
            marginBottom:  20, 

        },
        tab:{
            paddingVertical : 8 ,
            paddingHorizontal : 12 , 
            borderRadius : 6, 
            marginRight:  10, 
            backgroundColor  : "#f3f4f6",
        },
        activeTab:{
            backgroundColor : "#e5e7eb",
        },
        tabText:{
            color  : "#374151",

        },
        activeTabText: {
            color : "#111827", 
            fontWeight :  "600",

        }, 
        input :{
            borderWidth: 1 , 
            borderColor:  "e5e7eb",
            borderRadius: 6 , 
            padding: 12 , 
            marginBottom: 10, 

        },
        logInText: {
            color: "6b7280",
            marginBottom : 20, 

        }, 
        button :{
            backgroundColor  : "#1f2937",
            borderRadius: 6, 
            paddingVertical:  14 , 
            alignItems  : "center", 

        },
        buttonText:{
            color : "white" , 
            fontWeight: "600",

        },
    });

