import firestore from '@react-native-firebase/firestore';
import { generateUniqueTaskID } from './helper';

const db = firestore();


// Function to add a trip under a specific user
async function addTripForUser(userUID: string, tripData: any) {
  try {
    const userRef = db.collection("users").doc(userUID);
    const tripRef = await userRef.collection("trips").add(tripData);
    
    // Add the ID to the tripData object
    tripData.tripId = tripRef.id;
    
    // Update the trip document with the added ID
    await tripRef.update({ tripId: tripRef.id });
    
    return tripRef.id; // Return the ID of the added trip
  } catch (error) {
    console.error("Error adding trip: ", error);
    throw error;
  }
}

// Function to add a task under a specific trip
async function addTaskToTripForUser(userUID:string, tripID:string, taskData:any) {
  console.log(userUID,tripID,taskData)
  try {
    // Generate a unique task ID
    const taskID = await generateUniqueTaskID(userUID,tripID);
    
    // Reference the user's document, the trip's document, and the task to be added
    const userRef = db.collection("users").doc(userUID);
    const tripRef = userRef.collection("trips").doc(tripID);
    const taskRef = tripRef.collection("tasks").doc(taskID);
    
    // Add the task data
    await taskRef.set({...taskData,taskID:taskID});
    
    // Update the trip document with the added ID
    
    console.log("Task added successfully with ID:", taskID);
    return taskID;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

async function getAllTripsForUser(userUID:string) {
    try {
      const userRef = db.collection("users").doc(userUID);
      const tripsQuerySnapshot = await userRef.collection("trips").get();
      
      const trips:any = [];
      tripsQuerySnapshot.forEach((tripDoc) => {
        trips.push({ id: tripDoc.id, ...tripDoc.data() });
      });
  
      return trips;
    } catch (error) {
      console.error("Error getting trips: ", error);
      throw error;
    }
  }

  async function getAllTasksForTrip(userUID: string, tripID: string): Promise<any[]> {
    try {
      const userRef = db.collection("users").doc(userUID);
      const tripRef = userRef.collection("trips").doc(tripID);
      const tasksQuerySnapshot = await tripRef.collection("tasks").get();
  
      const tasks:any = [];
  
      tasksQuerySnapshot.forEach((taskDoc) => {
        tasks.push({ id: taskDoc.id, ...taskDoc.data() });
      });
  
      return tasks;
    } catch (error) {
      console.error("Error getting tasks: ", error);
      throw error;
    }
  }


  // Function to delete a task based on taskId and tripId
  async function deleteTaskFromTripForUser(userUID:string, tripID:string, taskID:string) {
    try {
      // Reference the user's document, the trip's document, and the task to be deleted
      const userRef = db.collection("users").doc(userUID);
      const tripRef = userRef.collection("trips").doc(tripID);
      const taskRef = tripRef.collection("tasks").doc(taskID);
      
      // Delete the task
      await taskRef.delete();
      
      console.log("Task deleted successfully with ID:", taskID);
    } catch (error) {
      console.error("Error deleting task: ", error);
      throw error;
    }
  }

  
  
export {addTripForUser,addTaskToTripForUser,getAllTripsForUser,getAllTasksForTrip,deleteTaskFromTripForUser}