import React,  {Component} from 'react'
import {
    StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

export default class Agenda extends Component {
    state = {
        tasks: [
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
            {id:Math.random(), desc:'Tarefa concluída', estimateAt:new Date(), doneAt:new Date()},
            {id:Math.random(), desc:'Tarefa pendente', estimateAt:new Date(), doneAt:null},
        ], 
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    addTask = task => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })

        this.setState({tasks,showAddTask:false},
            this.filterTasks)
    }

    onDeleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    filterTasks = () => {
        const filter = this.state.showDoneTasks ? (task => true) : (task => task.doneAt === null)
        const pedding = filter
        const visibleTasks = this.state.tasks.filter(pedding)
        this.setState({visibleTasks})
    }

    onToggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks},this.filterTasks)
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    onToggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if(task.id === id){
                task = {...task}
                task.doneAt = task.doneAt ? null : new Date()
            }
            return task
        })
        this.setState({tasks}, this.filterTasks)
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                        onSave={this.addTask}
                        onCancel={() => this.setState({showAddTask:false})} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.onToggleFilter}>
                            <Icon name={this.state.showDoneTasks? 'eye':'eye-slash'}
                                        size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                   <FlatList data={this.state.visibleTasks} 
                        keyExtractor={item=> `${item.id}`}
                        renderItem={({item})=> <Task {...item} onToggleTask={this.onToggleTask} 
                                                 onDelete={this.onDeleteTask}/>} />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                    onPress={()=> { this.setState({ showAddTask:true}) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    tasksContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    }
})
