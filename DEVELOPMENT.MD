# 1. Reflecting in retrospect before the Redux

-   I dont know the storybook, heard of it, I tried to do something with it, but it seemed like a totally different thing
-   I think I have used the styled components, but never reflected an extent to which they can be used. Took me a while to figure out that their default export is not here to stay (or is it?)
-   When asking questions, I am perfectly fine to look stupid, but it is not easy to come with the question in the first place (I admit, I don't want to risk asking something hillariously elementary, just for the sake of wasting the other person's time. I also find it silly to But I digress.)

-   ...

# 2. Reflecting the decision to add Redux

At the beginning I have decided not to use some app-wide state management, for it seems that app will be to small for it to make sense.

At about halfway through I have found out that I want to keep the structure of the application (I'm not sure I would come out with the better way without duplicationg code), I have decided it would be less of a mess if I add Redux (and maybe Axios for fetching, to be sure it is done better).

I had a a problem with passing the newTodo state to the list; I see that it is not a good way to use it to trigger the useEffect to update the array of Todos.

I figured out that in order to update the array consistently and less messy, Redux could be the way. Because: I need to update the array in a different components and right now there is starting to be too much of props being passed between the components.

# 3. Adding Redux

-   I find adding it challenging to add Redux by smaller pieces, since it only works... when it works. You can bargain with first adding a static selector and then some reducers.

-   I do not know if atomic comits mean that the thing needs to be functioning in each and every commit (that would make sense)

-   Adding redux (redux toolkit) according to the official documentation.

## 3.1. Main.tsx

I have a added a Provider to the Main.tsx. The Provider wraps the <App> component. I pass the "store" store to the Provider.

## 3.2. redux/store.tsx

I have created a "redux" folder, for the clarity (the official docs would recomend the /app folder and then also creating separate folders for other parts; this could be wise, especially with new functionalities).

In the store, the configureStore function is used to setup the redux store.
The store has reducers defined - the functions that will be the only functions that can mutate the store.
The whole store has a collection of reducers, but we can break them down into slices for better management.

## 3.3. redux/todoSlice

TodosSlice is a part of the store that will contain the array of Todos.
In its first iteration it will only return the array.

TodoSlice itself would have the addTodo reducer

## 3.4. redux/hooks

Following the documentation, I use hooks for selecting (later dispatching). Selecting means the returning the value of particular piece of redux store.

## 3.5 using hooks

I have added useAppSelector to the List component; where the todos state will be mapped.
I have also added this selector to the Footer, where (for the moment) I will return the length of todos. This may change a bit; maybe I should filter NOT DONE todos and done todos and save the count into the store; but it is also possible to filter them in footer and show the count for both.
