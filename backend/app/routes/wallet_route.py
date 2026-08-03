from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.wallet import Wallet
from app.models.wallet_transaction import WalletTransaction
from app.models.user import User

from app.schemas.wallet_schema import (
    WalletRecharge,
    RewardCreate
)


router = APIRouter(
    prefix="/wallet",
    tags=["Wallet & Rewards"]
)



# View Wallet

@router.get("/")
def get_wallet(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    wallet = (
        db.query(Wallet)
        .filter(
            Wallet.user_id == current_user.id
        )
        .first()
    )


    if not wallet:

        wallet = Wallet(
            user_id=current_user.id,
            balance=0,
            reward_points=0
        )

        db.add(wallet)
        db.commit()
        db.refresh(wallet)


    return wallet





# Wallet Recharge

@router.post("/recharge")
def recharge_wallet(
    data: WalletRecharge,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    wallet = (
        db.query(Wallet)
        .filter(
            Wallet.user_id == current_user.id
        )
        .first()
    )


    if not wallet:

        wallet = Wallet(
            user_id=current_user.id,
            balance=0
        )

        db.add(wallet)
        db.commit()
        db.refresh(wallet)



    wallet.balance += data.amount



    transaction = WalletTransaction(

        wallet_id=wallet.id,

        transaction_type="RECHARGE",

        amount=data.amount,

        description="Wallet Recharge"

    )


    db.add(transaction)

    db.commit()


    return {
        "message":"Wallet recharged successfully",
        "balance":wallet.balance
    }





# Cashback / Rewards

@router.post("/reward")
def add_reward(
    data: RewardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    wallet = (
        db.query(Wallet)
        .filter(
            Wallet.user_id == current_user.id
        )
        .first()
    )


    if not wallet:
        raise HTTPException(
            status_code=404,
            detail="Wallet not found"
        )


    wallet.balance += data.amount

    wallet.reward_points += int(data.amount)



    transaction = WalletTransaction(

        wallet_id=wallet.id,

        transaction_type=data.transaction_type,

        amount=data.amount,

        description=data.description

    )


    db.add(transaction)

    db.commit()



    return {
        "message":"Reward added successfully"
    }





# Wallet Transactions History

@router.get("/transactions")
def wallet_transactions(
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    wallet = (
        db.query(Wallet)
        .filter(
            Wallet.user_id == current_user.id
        )
        .first()
    )


    if not wallet:

        return []


    transactions = (
        db.query(WalletTransaction)
        .filter(
            WalletTransaction.wallet_id == wallet.id
        )
        .all()
    )


    return transactions