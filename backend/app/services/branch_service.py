from sqlalchemy.orm import Session

from app.models.branch import Branch



# Create Branch

def create_branch(
    db: Session,
    data
):

    branch = Branch(

        restaurant_id=data.restaurant_id,

        manager_id=data.manager_id,

        branch_name=data.branch_name,

        location=data.location,

        phone=data.phone,

        status="ACTIVE"

    )


    db.add(branch)

    db.commit()

    db.refresh(branch)


    return branch





# Get All Branches

def get_branches(
    db: Session
):

    return (

        db.query(Branch)

        .order_by(
            Branch.created_at.desc()
        )

        .all()

    )






# Get Single Branch

def get_branch_by_id(

    db: Session,

    branch_id:int

):

    return (

        db.query(Branch)

        .filter(
            Branch.id == branch_id
        )

        .first()

    )







# Update Branch

def update_branch(

    db: Session,

    branch_id:int,

    data

):

    branch = get_branch_by_id(

        db,

        branch_id

    )


    if branch:


        if data.branch_name:
            branch.branch_name = data.branch_name


        if data.location:
            branch.location = data.location


        if data.phone:
            branch.phone = data.phone


        if data.manager_id:
            branch.manager_id = data.manager_id


        if data.status:
            branch.status = data.status



        db.commit()

        db.refresh(branch)


    return branch







# Delete Branch

def delete_branch(

    db: Session,

    branch_id:int

):

    branch = get_branch_by_id(

        db,

        branch_id

    )


    if branch:

        db.delete(branch)

        db.commit()


    return branch