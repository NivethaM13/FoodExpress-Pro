from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class WalletTransaction(Base):

    __tablename__ = "wallet_transactions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    wallet_id = Column(
        Integer,
        ForeignKey("wallets.id"),
        nullable=False
    )


    transaction_type = Column(
        String(50),
        nullable=False
    )


    amount = Column(
        Float,
        nullable=False
    )


    description = Column(
        String(255),
        nullable=True
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    wallet = relationship(
        "Wallet"
    )