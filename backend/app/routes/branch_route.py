from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.branch_schema import (
    BranchCreate,
    BranchUpdate
)

from app.services.branch_service import (
    create_branch,
    get_branches,
    get_branch_by_id,
    update_branch,
    delete_branch
)



router = APIRouter(

    prefix="/branches",

    tags=["Branches"]

)





# Create Branch

@router.post("/")
def add_branch(

    data: BranchCreate,

    db: Session = Depends(get_db)

):

    return create_branch(

        db,

        data

    )







# Get All Branches

@router.get("/")
def all_branches(

    db: Session = Depends(get_db)

):

    return get_branches(db)







# Get Branch By ID

@router.get("/{branch_id}")
def branch_details(

    branch_id:int,

    db: Session = Depends(get_db)

):

    branch = get_branch_by_id(

        db,

        branch_id

    )


    if not branch:

        raise HTTPException(

            status_code=404,

            detail="Branch not found"

        )


    return branch







# Update Branch

@router.put("/{branch_id}")
def edit_branch(

    branch_id:int,

    data: BranchUpdate,

    db: Session = Depends(get_db)

):

    branch = update_branch(

        db,

        branch_id,

        data

    )


    if not branch:

        raise HTTPException(

            status_code=404,

            detail="Branch not found"

        )


    return {

        "message":"Branch updated successfully",

        "branch":branch

    }







# Delete Branch

@router.delete("/{branch_id}")
def remove_branch(

    branch_id:int,

    db: Session = Depends(get_db)

):

    branch = delete_branch(

        db,

        branch_id

    )


    if not branch:

        raise HTTPException(

            status_code=404,

            detail="Branch not found"

        )


    return {

        "message":"Branch deleted successfully"

    }