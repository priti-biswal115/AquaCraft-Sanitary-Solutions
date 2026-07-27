/* ============================================================
   AQUACRAFT SANITARY SOLUTIONS
   COMPLETE DATABASE SETUP
============================================================ */

/* ============================================================
   DATABASE
============================================================ */

CREATE DATABASE AquaCraftSanitaryDB;
GO

USE AquaCraftSanitaryDB;
GO


/* ============================================================
   CUSTOMERS
============================================================ */

CREATE TABLE Customers
(
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerName NVARCHAR(100) NOT NULL,
    Phone VARCHAR(15),
    Address NVARCHAR(250),
    GSTNo VARCHAR(20)
);
GO

INSERT INTO Customers
(
    CustomerName,
    Phone,
    Address,
    GSTNo
)
VALUES
('Gupta Traders','9876543210','Delhi','GST001'),
('Sharma Sanitary','9876543211','Noida','GST002'),
('Verma Hardware','9876543212','Gurugram','GST003'),
('Agarwal Traders','9876543213','Delhi','GST004'),
('Singh Bathware','9876543214','Faridabad','GST005'),
('Mohan Enterprises','9876543215','Delhi','GST006'),
('Royal Hardware','9876543216','Noida','GST007'),
('Jain Sanitary','9876543217','Ghaziabad','GST008'),
('Modern Traders','9876543218','Delhi','GST009'),
('Om Bath Collection','9876543219','Gurugram','GST010');
GO


/* ============================================================
   PRODUCTS
   4 MAIN PRODUCTS × 4 CATEGORIES = 16 PRODUCTS
============================================================ */

CREATE TABLE Products
(
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    ProductType NVARCHAR(50) NOT NULL,
    ProductName NVARCHAR(100) NOT NULL,
    HSNCode VARCHAR(20)
);
GO

INSERT INTO Products
(
    ProductType,
    ProductName,
    HSNCode
)
VALUES

-- TAPS
('Tap','Tap Premium','8481'),
('Tap','Tap Deluxe','8481'),
('Tap','Tap Luxury','8481'),
('Tap','Tap Economy','8481'),

-- SHOWERS
('Shower','Shower Premium','3922'),
('Shower','Shower Deluxe','3922'),
('Shower','Shower Luxury','3922'),
('Shower','Shower Economy','3922'),

-- WASH BASINS
('Wash Basin','Wash Basin Premium','6910'),
('Wash Basin','Wash Basin Deluxe','6910'),
('Wash Basin','Wash Basin Luxury','6910'),
('Wash Basin','Wash Basin Economy','6910'),

-- DRAIN COVERS
('Drain Cover','Drain Cover Premium','7324'),
('Drain Cover','Drain Cover Deluxe','7324'),
('Drain Cover','Drain Cover Luxury','7324'),
('Drain Cover','Drain Cover Economy','7324');
GO


/* ============================================================
   CUSTOMER PRICING
   DIFFERENT RATE FOR DIFFERENT CUSTOMER
============================================================ */

CREATE TABLE CustomerPricing
(
    PricingId INT IDENTITY(1,1) PRIMARY KEY,

    CustomerId INT NOT NULL,

    ProductId INT NOT NULL,

    Rate DECIMAL(18,2) NOT NULL,

    CONSTRAINT FK_CustomerPricing_Customers
        FOREIGN KEY(CustomerId)
        REFERENCES Customers(CustomerId),

    CONSTRAINT FK_CustomerPricing_Products
        FOREIGN KEY(ProductId)
        REFERENCES Products(ProductId)
);
GO


/* ============================================================
   SAMPLE PRICE DATA
   REPLACE WITH REAL BUSINESS DATA LATER
============================================================ */

INSERT INTO CustomerPricing
(
    CustomerId,
    ProductId,
    Rate
)
VALUES

/* CUSTOMER 1 - Gupta Traders */
(1,1,120),
(1,2,130),
(1,3,140),
(1,4,110),
(1,5,300),
(1,6,320),
(1,7,350),
(1,8,280),
(1,9,700),
(1,10,750),
(1,11,800),
(1,12,650),
(1,13,90),
(1,14,100),
(1,15,120),
(1,16,80),

/* CUSTOMER 2 - Sharma Sanitary */
(2,1,125),
(2,2,135),
(2,3,145),
(2,4,115),
(2,5,310),
(2,6,330),
(2,7,360),
(2,8,290),
(2,9,710),
(2,10,760),
(2,11,810),
(2,12,660),
(2,13,95),
(2,14,105),
(2,15,125),
(2,16,85),

/* CUSTOMER 3 - Verma Hardware */
(3,1,118),
(3,2,128),
(3,3,138),
(3,4,108),
(3,5,295),
(3,6,315),
(3,7,345),
(3,8,275),
(3,9,690),
(3,10,740),
(3,11,790),
(3,12,640),
(3,13,88),
(3,14,98),
(3,15,118),
(3,16,78),

/* CUSTOMER 4 - Agarwal Traders */
(4,1,130),
(4,2,140),
(4,3,150),
(4,4,120),
(4,5,320),
(4,6,340),
(4,7,370),
(4,8,300),
(4,9,720),
(4,10,770),
(4,11,820),
(4,12,670),
(4,13,100),
(4,14,110),
(4,15,130),
(4,16,90),

/* CUSTOMER 5 - Singh Bathware */
(5,1,135),
(5,2,145),
(5,3,155),
(5,4,125),
(5,5,325),
(5,6,345),
(5,7,375),
(5,8,305),
(5,9,725),
(5,10,775),
(5,11,825),
(5,12,675),
(5,13,105),
(5,14,115),
(5,15,135),
(5,16,95),

/* CUSTOMER 6 - Mohan Enterprises */
(6,1,122),
(6,2,132),
(6,3,142),
(6,4,112),
(6,5,302),
(6,6,322),
(6,7,352),
(6,8,282),
(6,9,702),
(6,10,752),
(6,11,802),
(6,12,652),
(6,13,92),
(6,14,102),
(6,15,122),
(6,16,82),

/* CUSTOMER 7 - Royal Hardware */
(7,1,128),
(7,2,138),
(7,3,148),
(7,4,118),
(7,5,318),
(7,6,338),
(7,7,368),
(7,8,298),
(7,9,718),
(7,10,768),
(7,11,818),
(7,12,668),
(7,13,98),
(7,14,108),
(7,15,128),
(7,16,88),

/* CUSTOMER 8 - Jain Sanitary */
(8,1,132),
(8,2,142),
(8,3,152),
(8,4,122),
(8,5,322),
(8,6,342),
(8,7,372),
(8,8,302),
(8,9,722),
(8,10,772),
(8,11,822),
(8,12,672),
(8,13,102),
(8,14,112),
(8,15,132),
(8,16,92),

/* CUSTOMER 9 - Modern Traders */
(9,1,124),
(9,2,134),
(9,3,144),
(9,4,114),
(9,5,304),
(9,6,324),
(9,7,354),
(9,8,284),
(9,9,704),
(9,10,754),
(9,11,804),
(9,12,654),
(9,13,94),
(9,14,104),
(9,15,124),
(9,16,84),

/* CUSTOMER 10 - Om Bath Collection */
(10,1,138),
(10,2,148),
(10,3,158),
(10,4,128),
(10,5,328),
(10,6,348),
(10,7,378),
(10,8,308),
(10,9,728),
(10,10,778),
(10,11,828),
(10,12,678),
(10,13,108),
(10,14,118),
(10,15,138),
(10,16,98);


/* ============================================================
   INVOICES
============================================================ */

CREATE TABLE Invoices
(
    InvoiceId INT IDENTITY(1,1) PRIMARY KEY,

    InvoiceNumber VARCHAR(50) NOT NULL,

    CustomerId INT NOT NULL,

    InvoiceDate DATETIME NOT NULL DEFAULT GETDATE(),

    SubTotal DECIMAL(18,2) NOT NULL,

    GSTAmount DECIMAL(18,2) NOT NULL,

    GrandTotal DECIMAL(18,2) NOT NULL,

    Status VARCHAR(20) NOT NULL DEFAULT 'Generated',

    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Invoices_Customers
        FOREIGN KEY(CustomerId)
        REFERENCES Customers(CustomerId)
);
GO


/* ============================================================
   INVOICE ITEMS
============================================================ */

CREATE TABLE InvoiceItems
(
    InvoiceItemId INT IDENTITY(1,1) PRIMARY KEY,

    InvoiceId INT NOT NULL,

    ProductId INT NOT NULL,

    Quantity INT NOT NULL,

    Rate DECIMAL(18,2) NOT NULL,

    Amount DECIMAL(18,2) NOT NULL,

    CONSTRAINT FK_InvoiceItems_Invoices
        FOREIGN KEY(InvoiceId)
        REFERENCES Invoices(InvoiceId),

    CONSTRAINT FK_InvoiceItems_Products
        FOREIGN KEY(ProductId)
        REFERENCES Products(ProductId)
);
GO


/* ============================================================
   BUSINESS SETTINGS
============================================================ */

CREATE TABLE BusinessSettings
(
    BusinessId INT IDENTITY(1,1) PRIMARY KEY,

    BusinessName NVARCHAR(150) NOT NULL,

    GSTNo VARCHAR(20),

    Phone VARCHAR(15),

    Address NVARCHAR(250)
);
GO

INSERT INTO BusinessSettings
(
    BusinessName,
    GSTNo,
    Phone,
    Address
)
VALUES
(
    'AquaCraft Sanitary Solutions',
    '07AACCS1234F1Z5',
    '9999999999',
    'New Delhi, India'
);
GO


/* ============================================================
   SAMPLE OLD INVOICE HISTORY
   (MIGRATED HANDWRITTEN BILL)
============================================================ */

INSERT INTO Invoices
(
    InvoiceNumber,
    CustomerId,
    InvoiceDate,
    SubTotal,
    GSTAmount,
    GrandTotal,
    Status
)
VALUES
('ACS-2025-0001',1,'2025-01-10',1200,60,1260,'Generated'),
('ACS-2025-0002',2,'2025-01-15',1800,90,1890,'Generated'),
('ACS-2025-0003',3,'2025-01-20',2200,110,2310,'Generated'),
('ACS-2025-0004',4,'2025-02-01',1500,75,1575,'Generated'),
('ACS-2025-0005',5,'2025-02-10',2600,130,2730,'Generated'),
('ACS-2025-0006',6,'2025-02-18',3000,150,3150,'Generated'),
('ACS-2025-0007',7,'2025-03-02',1800,90,1890,'Generated'),
('ACS-2025-0008',8,'2025-03-12',2750,137.50,2887.50,'Generated'),
('ACS-2025-0009',9,'2025-03-20',3200,160,3360,'Generated'),
('ACS-2025-0010',10,'2025-04-01',2100,105,2205,'Generated'),
('ACS-2025-0011',1,'2025-04-15',1700,85,1785,'Generated'),
('ACS-2025-0012',2,'2025-05-01',2300,115,2415,'Generated'),
('ACS-2025-0013',3,'2025-05-18',2800,140,2940,'Generated'),
('ACS-2025-0014',4,'2025-06-01',3500,175,3675,'Generated'),
('ACS-2025-0015',5,'2025-06-15',4000,200,4200,'Generated');
GO


INSERT INTO InvoiceItems
(
    InvoiceId,
    ProductId,
    Quantity,
    Rate,
    Amount
)
VALUES

-- Invoice 1
(1,1,10,120,1200),

-- Invoice 2
(2,5,6,300,1800),

-- Invoice 3
(3,9,2,700,1400),
(3,10,1,800,800),

-- Invoice 4
(4,2,10,150,1500),

-- Invoice 5
(5,7,5,350,1750),
(5,13,10,85,850),

-- Invoice 6
(6,11,3,1000,3000),

-- Invoice 7
(7,3,10,180,1800),

-- Invoice 8
(8,5,5,320,1600),
(8,14,10,115,1150),

-- Invoice 9
(9,9,4,800,3200),

-- Invoice 10
(10,1,5,120,600),
(10,5,5,300,1500),

-- Invoice 11
(11,2,10,170,1700),

-- Invoice 12
(12,6,5,460,2300),

-- Invoice 13
(13,10,4,700,2800),

-- Invoice 14
(14,11,5,700,3500),

-- Invoice 15
(15,9,5,800,4000);
GO


SELECT *
FROM Invoices


SELECT name
FROM sys.databases;