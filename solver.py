
#ALGORITHM
"""
1. Start in upper left corner
2. Go through every number
3. If one that fits is found continue with it
4. Go to the next cell (the cell to the right) [] -> []
5. Find a number that fits 
6. If no numbers fits return 0 to backtrack and delete the number placed one recursion earlyer. 
   Because if no number fits, the previus cell was placed in correctly. 
8. Find a new number for were the deleted number was
9. Continue recusively until all cells are filled out
"""

# [X] Loop through every number that can be placed in the cell
# [X] Check if it fits - [X] If its fits check if we are at 8,8 if so return 1 [X] else go to the next cell
# [X] If the next cell returns 0 meaning that at some point nothing was fitting - Delete the number in our cell and try the next.
# [X] If the next cell returns 1 this means that we got to the end and everything fits return 1
"""
If we went through all numbers but our cell is stil 0 nothing was fitting - this can only happen if either no cell fits or 
every fitting cell ended with a cell were no numbers fitted
and we return 0 for the previus cell
to delete the number in its cell and try another number
"""
           

board = [

    [2,4,6, 8,5,7,  0,0,3],
    [1,0,0, 6,0,0,  2,7,5],
    [0,7,0, 0,0,0,  0,0,0],

    [0,1,0, 3,0,9,  0,6,0],
    [6,3,0, 0,8,5,  0,2,0],
    [0,5,2, 0,0,6,  0,4,8],
    
    [7,0,4, 0,0,2,  8,0,1],
    [3,2,1, 9,0,0,  0,0,0],
    [8,0,0, 0,1,0,  0,0,2]

]


width = 9
height = 9


def fits(n, pos):

    """
    Function to return 1 if a given number fits in a soduko board at a given position
    Returns 0 if the given number does not fit at the given position
    """

    # Variables to store all values of the positions row, col and sqaure
    # To check if it fits
    row_vals = []
    col_vals = []
    square_vals = []

    # Lopping through every col and row to find positions matching either the row or the col of
    # of the given pos

    for y in range(width):
        for x in range(height):
            
            # Adding the value of the cell to col_vals
            if y == pos[1]:
                col_vals.append(board[y][x])
            
            # Adding the value of the cell to row_vals
            if x == pos[0]:
                row_vals.append(board[y][x])


    # Figuring out in which of the 9 smaller squares the cell is in. by giving all of the 
    # smaller squares an x and a y between 1 and 3 the top left corner square is therefore square 1,1
    # If the cells x is lower than 3 its in one of the leftmost squares
    if pos[0] < 3:
        square_x = 1
    # One of the middle squares
    elif pos[0] > 2 and pos[0] < 6: 
        square_x = 2
    # One of the rightmost squares
    else: 
        square_x = 3

    # Doing the same for y
    if pos[1] < 3:
        square_y = 1
    elif pos[1] > 2 and pos[1] < 6: 
        square_y = 2
    else: 
        square_y = 3

    # Looping through every value in the square around the cell
    for y1 in range((square_y - 1) * 3, (square_y - 1) * 3 + 3):
        for x1 in range((square_x - 1) * 3, (square_x - 1) * 3 + 3):
            # Adding the values of every cell in the square to square_vals
            square_vals.append(board[y1][x1])

    # Returning 0 if the given number is in either the row col or square of the given position
    if n in row_vals or n in col_vals or n in square_vals:
        return 0

    # Otherwise return 1
    return 1

def solve(n):

    # Calculating an x and a y based on the number
    pos = [int(n % width), int(n / width)]

    # If the square was already filled before trying to solve: special rules apply - the cell cant change value
    if board[pos[1]][pos[0]] != 0:

        # Checking if this is the last cell in the chain
        # Because if we got to the last cell and it is already filled the job is done and we can return 1
        if pos[0] == 8 and pos[1] == 8:
            print("n:", n, "Im at 8,8 but im already filed")
            return 1
        
        # If this is not the last cell we go to the next cell
        else:
        
            # If the next cell returns 1 we have reached the end. Because the only way a cell can return 1
            # is if we either got to the end and succeded or it was send up the chain starting at the end
            if solve(n + 1):
                return 1

            # If the next cell returns 0 we just send it through up the chain without doing anything. 
            # because the cell was filled from the start
            else:
                print("n:", n, "next cell returned 0: but i was already filled - returning 0 for previus cell to delete")
                return 0
    
    # If the cell was not filled from the start
    else:
        
        # Going through every number from 1 to 9
        for i in range(1, 10):

            # Checking if it fits
            if fits(i, pos):

                # Service message
                print("n:", n, "Found fitting number:", i)

                # Sets the cell to the fiting number
                board[pos[1]][pos[0]] = i

                # Cheking if we are the last cell
                # If it fits and we are the last cell the soduko has been solved and we return 1
                if pos[0] == 8 and pos[1] == 8:
                    print("n:", n, "Number was fitting and i am at 8,8 number:", i)
                    return 1

                # If we are not the last cell
                # Place the number and go on
                else:
                    print("n:", n, "Number was fitting but im at", pos[0], pos[1])
                    
                    # If the next cell returns 0 we just send it through up the chain without doing anything. 
                    # because the cell was filled from the start
                    if solve(n + 1):
                        return 1
                    # If it returned 0 something down the chain did not fit and we delete our number to try the next
                    else:
                        print("n:", n, "next cell returned 0: deleting cell trying next number")
                        board[pos[1]][pos[0]] = 0

        # If we got through every number but the cell is still 0
        # Nothing was fitting
        if board[pos[1]][pos[0]] == 0:
            print("n:", n, "went through all numbers cell still 0")
            # We return 0 to trigger backtracking in the previus cell
            return 0


print("Board before")

for r in board:
    print(r)     

solve(0)

print("Board after")

for r in board:
    print(r)