import {Client, Databases, Query, ID} from "appwrite";


const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const tableID = import.meta.env.VITE_APPWRITE_TABLE;
const dbID = import.meta.env.VITE_APPWRITE_DB;


const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(projectID);

const database = new Databases(client)

export const updateSearchCount = async (searchText, movie)=>{
    try{
        const result = await database.listDocuments(dbID, tableID, [
            Query.equal('searchTerm', searchText),
        ])

        if(result.documents.length > 0){
            const doc = result.documents[0];
            await database.updateDocument(dbID, tableID, doc.$id, {
                count: doc.count+1,
            });
        } else {
            await database.createDocument(dbID, tableID, ID.unique(), {
                searchTerm: searchText,
                count: 1,
                movie_id: movie.id,
                posterURL: movie.poster_path,
            })
        }
    }catch(err){
        console.error(err)
    }
}

export const getTrendingovies = async () => {
    try{
        const result = await database.listDocuments(dbID, tableID, [
            Query.limit(5),
            Query.orderDesc('count')
        ]);
        console.log('Trending Movies' + result.documents);
        return result.documents;
    } catch (e){
        console.error('Errors occured while fetching trending movies'+ e)
    }
}