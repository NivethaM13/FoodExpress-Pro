from typing import Optional
from pydantic import BaseModel



# Create Wallet

class WalletCreate(BaseModel):

    user_id: int



# Recharge Wallet

class WalletRecharge(BaseModel):

    amount: float



# Add Reward / Cashback

class RewardCreate(BaseModel):

    amount: float

    transaction_type: str

    description: Optional[str] = None



# Wallet Response

class WalletResponse(BaseModel):

    id: int

    user_id: int

    balance: float

    reward_points: int


    class Config:
        from_attributes = True



# Transaction Response

class WalletTransactionResponse(BaseModel):

    id: int

    wallet_id: int

    transaction_type: str

    amount: float

    description: Optional[str]


    class Config:
        from_attributes = True