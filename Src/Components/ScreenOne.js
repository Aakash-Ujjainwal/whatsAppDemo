/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {OpenAI} from 'openai';
import Constants from 'expo-constants';

const ScreenOne = () => {
  const [count, setCount] = useState([
    {
      id: 1,
      name: 'Mobile',
      status: false,
      category: 'Electronics',
      priority: 'Medium',
    },
    {
      id: 2,
      name: 'Laptop',
      status: false,
      category: 'Electronics',
      priority: 'High',
    },
    {
      id: 3,
      name: 'TV',
      status: false,
      category: 'Entertainment',
      priority: 'Low',
    },
    {
      id: 4,
      name: 'Ps5',
      status: false,
      category: 'Entertainment',
      priority: 'Medium',
    },
  ]);
  const [myValue, setmyValue] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [voiceInput, setVoiceInput] = useState(false);

  // Initialize OpenAI using key from app.config.js (loaded from .env)
  const openai = new OpenAI({
    apiKey: Constants.expoConfig?.extra?.openaiApiKey ?? '',
    dangerouslyAllowBrowser: true, // required for React Native / client-side use
  });

  // AI-powered task categorization and prioritization
  const analyzeTask = async (taskName) => {
    try {
      setAiLoading(true);
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful task analyzer. Categorize and prioritize tasks. Respond in JSON format with category and priority fields.',
          },
          {
            role: 'user',
            content: `Analyze the task: "${taskName}". Provide a category (like Work, Personal, Shopping, etc.) and priority (Low, Medium, High).`,
          },
        ],
        response_format: {type: 'json_object'},
      });

      const analysis = JSON.parse(response.choices[0].message.content);
      return {
        category: analysis.category || 'General',
        priority: analysis.priority || 'Medium',
      };
    } catch (error) {
      console.log('AI analysis error:', error);
      return {
        category: 'General',
        priority: 'Medium',
      };
    } finally {
      setAiLoading(false);
    }
  };

  // AI-powered task suggestions based on existing tasks
  const getTaskSuggestions = async () => {
    if (count.length === 0) {
      return;
    }

    try {
      setAiLoading(true);
      const taskList = count.map(t => t.name).join(', ');

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              "You are a helpful task assistant. Suggest 3 relevant tasks based on the user's existing tasks.",
          },
          {
            role: 'user',
            content: `Based on these tasks: ${taskList}, suggest 3 more relevant tasks I might want to add. Respond with just a comma-separated list.`,
          },
        ],
      });

      const suggestionText = response.choices[0].message.content;
      setSuggestions(
        suggestionText
          .split(',')
          .map(s => s.trim())
          .filter(s => s),
      );
    } catch (error) {
      console.log('AI suggestion error:', error);
    } finally {
      setAiLoading(false);
    }
  };

  // Voice input simulation (would integrate with actual speech-to-text in a real app)
  const startVoiceInput = () => {
    setVoiceInput(true);
    Alert.prompt(
      'Voice Input',
      'Speak your task (simulated - type your task for this demo)',
      text => {
        setVoiceInput(false);
        if (text) {
          setmyValue(text);
        }
      },
    );
  };

  const selectFn = (id, type) => {
    const newArr = count.map(val => {
      if (val.id === id) {
        return {...val, status: type};
      } else {
        return val;
      }
    });
    setCount(newArr);
  };

  const deleteItem = id => {
    const newItem = count.filter(val => val.id !== id);
    setCount(newItem);
  };

  const deleteAll = () => {
    const Newitems = count.filter(val => !val.status);
    setCount(Newitems);
  };

  const addFn = async () => {
    if (!myValue.trim()) {
      return;
    }

    // Get AI analysis for the new task
    const {category, priority} = await analyzeTask(myValue);

    let myValueObj = {
      id: Math.random(),
      name: myValue.trim(),
      status: false,
      category,
      priority,
    };

    setmyValue('');
    setCount([...count, myValueObj]);
  };

  const applySuggestion = suggestion => {
    setmyValue(suggestion);
    setSuggestions([]);
  };

  // Get suggestions when task list changes
  useEffect(() => {
    const timer = setTimeout(() => {
      getTaskSuggestions();
    }, 2000);

    return () => clearTimeout(timer);
  }, [count]);

  const renderMain = ({item}) => {
    return (
      <View
        style={[
          styles.ListView,
          {borderLeftColor: getPriorityColor(item.priority), borderLeftWidth: 5},
        ]}>
        <View style={styles.MainBtnView}>
          <TouchableOpacity onPress={() => selectFn(item.id, !item.status)}>
            {item.status !== true ? (
              <Image
                style={styles.radioBtn}
                source={require('../Assets/Images/uncheck.png')}
              />
            ) : (
              <Image
                style={styles.radioBtn}
                source={require('../Assets/Images/checked.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.MainTxtView}>
          <Text style={styles.taskText}>{item.name}</Text>
          <View style={styles.taskMeta}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text
              style={[
                styles.priorityText,
                {color: getPriorityColor(item.priority)},
              ]}>
              {item.priority}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Image
            style={styles.deleteBtn}
            source={require('../Assets/Images/delete.webp')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return '#ff4444';
      case 'Medium':
        return '#ffbb33';
      case 'Low':
        return '#00C851';
      default:
        return '#33b5e5';
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.Maincontainer}>
        <Text style={styles.headerText}>My Smart Todo List</Text>

        {/* AI-powered suggestions */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>AI Suggestions:</Text>
            <View style={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => applySuggestion(suggestion)}>
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.Search_addView}>
          <TextInput
            style={styles.placeholderStyle}
            placeholderTextColor="black"
            placeholder="Add a task or speak it..."
            value={myValue}
            keyboardType="default"
            onChangeText={txt => setmyValue(txt)}
          />
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={startVoiceInput}>
            <Image
              style={styles.voiceIcon}
              source={require('../Assets/Images/microphone.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={myValue.length <= 0 || aiLoading}
            style={styles.addButton}
            onPress={addFn}>
            {aiLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.addButtonText}>Add</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.MainContentView}>
          {count.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tasks yet!</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adding a task or use voice input.
              </Text>
            </View>
          ) : (
            <FlatList
              data={count}
              keyExtractor={item => item.id.toString()}
              renderItem={renderMain}
              bounces={false}
            />
          )}
        </View>

        <TouchableOpacity
          disabled={count.length == 0}
          onPress={deleteAll}
          style={[
            styles.DeleteAllView,
            {backgroundColor: count.length === 0 ? 'gray' : '#ff4444'},
          ]}>
          <Text style={styles.deleteAllText}>Delete Selected Items</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  Maincontainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 10,
    color: '#333',
  },
  Search_addView: {
    height: 80,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderStyle: {
    height: 50,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 15,
    backgroundColor: 'white',
    marginRight: 10,
  },
  voiceButton: {
    padding: 10,
    marginRight: 10,
  },
  voiceIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    backgroundColor: '#33b5e5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  MainContentView: {
    width: '100%',
    flex: 1,
    marginTop: 10,
  },
  ListView: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingRight: 10,
  },
  radioBtn: {
    height: 30,
    width: 30,
  },
  MainBtnView: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainTxtView: {
    flex: 1,
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskMeta: {
    flexDirection: 'row',
    marginTop: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteBtn: {
    height: 30,
    width: 30,
  },
  DeleteAllView: {
    height: 50,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAllText: {
    color: 'white',
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    width: '100%',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  suggestionsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0d47a1',
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionItem: {
    backgroundColor: '#bbdefb',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    color: '#0d47a1',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default ScreenOne;