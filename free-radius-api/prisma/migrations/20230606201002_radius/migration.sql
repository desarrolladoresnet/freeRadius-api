-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batch_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `batch_name` VARCHAR(64) NULL,
    `batch_description` VARCHAR(256) NULL,
    `hotspot_id` INTEGER NULL DEFAULT 0,
    `batch_status` VARCHAR(128) NOT NULL DEFAULT 'Pending',
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `batch_name`(`batch_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NULL,
    `planId` INTEGER NULL,
    `billAmount` VARCHAR(200) NULL,
    `billAction` VARCHAR(128) NOT NULL DEFAULT 'Unavailable',
    `billPerformer` VARCHAR(200) NULL,
    `billReason` VARCHAR(200) NULL,
    `paymentmethod` VARCHAR(200) NULL,
    `cash` VARCHAR(200) NULL,
    `creditcardname` VARCHAR(200) NULL,
    `creditcardnumber` VARCHAR(200) NULL,
    `creditcardverification` VARCHAR(200) NULL,
    `creditcardtype` VARCHAR(200) NULL,
    `creditcardexp` VARCHAR(200) NULL,
    `coupon` VARCHAR(200) NULL,
    `discount` VARCHAR(200) NULL,
    `notes` VARCHAR(200) NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_merchant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NOT NULL DEFAULT '',
    `password` VARCHAR(128) NOT NULL DEFAULT '',
    `mac` VARCHAR(200) NOT NULL DEFAULT '',
    `pin` VARCHAR(200) NOT NULL DEFAULT '',
    `txnId` VARCHAR(200) NOT NULL DEFAULT '',
    `planName` VARCHAR(128) NOT NULL DEFAULT '',
    `planId` INTEGER NOT NULL,
    `quantity` VARCHAR(200) NOT NULL DEFAULT '',
    `business_email` VARCHAR(200) NOT NULL DEFAULT '',
    `business_id` VARCHAR(200) NOT NULL DEFAULT '',
    `txn_type` VARCHAR(200) NOT NULL DEFAULT '',
    `txn_id` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_type` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_tax` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_cost` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_fee` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_total` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_currency` VARCHAR(200) NOT NULL DEFAULT '',
    `first_name` VARCHAR(200) NOT NULL DEFAULT '',
    `last_name` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_email` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_name` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_street` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_country` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_country_code` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_city` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_state` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_address_zip` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_date` DATETIME(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `payment_status` VARCHAR(200) NOT NULL DEFAULT '',
    `pending_reason` VARCHAR(200) NOT NULL DEFAULT '',
    `reason_code` VARCHAR(200) NOT NULL DEFAULT '',
    `receipt_ID` VARCHAR(200) NOT NULL DEFAULT '',
    `payment_address_status` VARCHAR(200) NOT NULL DEFAULT '',
    `vendor_type` VARCHAR(200) NOT NULL DEFAULT '',
    `payer_status` VARCHAR(200) NOT NULL DEFAULT '',

    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_paypal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NULL,
    `password` VARCHAR(128) NULL,
    `mac` VARCHAR(200) NULL,
    `pin` VARCHAR(200) NULL,
    `txnId` VARCHAR(200) NULL,
    `planName` VARCHAR(128) NULL,
    `planId` VARCHAR(200) NULL,
    `quantity` VARCHAR(200) NULL,
    `receiver_email` VARCHAR(200) NULL,
    `business` VARCHAR(200) NULL,
    `tax` VARCHAR(200) NULL,
    `mc_gross` VARCHAR(200) NULL,
    `mc_fee` VARCHAR(200) NULL,
    `mc_currency` VARCHAR(200) NULL,
    `first_name` VARCHAR(200) NULL,
    `last_name` VARCHAR(200) NULL,
    `payer_email` VARCHAR(200) NULL,
    `address_name` VARCHAR(200) NULL,
    `address_street` VARCHAR(200) NULL,
    `address_country` VARCHAR(200) NULL,
    `address_country_code` VARCHAR(200) NULL,
    `address_city` VARCHAR(200) NULL,
    `address_state` VARCHAR(200) NULL,
    `address_zip` VARCHAR(200) NULL,
    `payment_date` DATETIME(0) NULL,
    `payment_status` VARCHAR(200) NULL,
    `payment_address_status` VARCHAR(200) NULL,
    `payer_status` VARCHAR(200) NULL,

    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planName` VARCHAR(128) NULL,
    `planId` VARCHAR(128) NULL,
    `planType` VARCHAR(128) NULL,
    `planTimeBank` VARCHAR(128) NULL,
    `planTimeType` VARCHAR(128) NULL,
    `planTimeRefillCost` VARCHAR(128) NULL,
    `planBandwidthUp` VARCHAR(128) NULL,
    `planBandwidthDown` VARCHAR(128) NULL,
    `planTrafficTotal` VARCHAR(128) NULL,
    `planTrafficUp` VARCHAR(128) NULL,
    `planTrafficDown` VARCHAR(128) NULL,
    `planTrafficRefillCost` VARCHAR(128) NULL,
    `planRecurring` VARCHAR(128) NULL,
    `planRecurringPeriod` VARCHAR(128) NULL,
    `planRecurringBillingSchedule` VARCHAR(128) NOT NULL DEFAULT 'Fixed',
    `planCost` VARCHAR(128) NULL,
    `planSetupCost` VARCHAR(128) NULL,
    `planTax` VARCHAR(128) NULL,
    `planCurrency` VARCHAR(128) NULL,
    `planGroup` VARCHAR(128) NULL,
    `planActive` VARCHAR(32) NOT NULL DEFAULT 'yes',
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `planName`(`planName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_plans_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_name` VARCHAR(128) NOT NULL,
    `profile_name` VARCHAR(256) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing_rates` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rateName` VARCHAR(128) NOT NULL DEFAULT '',
    `rateType` VARCHAR(128) NOT NULL DEFAULT '',
    `rateCost` INTEGER NOT NULL DEFAULT 0,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `rateName`(`rateName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cui` (
    `clientipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `callingstationid` VARCHAR(50) NOT NULL DEFAULT '',
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `cui` VARCHAR(32) NOT NULL DEFAULT '',
    `creationdate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lastaccounting` TIMESTAMP(0) NOT NULL DEFAULT '0000-00-00 00:00:00',

    PRIMARY KEY (`username`, `clientipaddress`, `callingstationid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dictionary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Type` VARCHAR(30) NULL,
    `Attribute` VARCHAR(64) NULL,
    `Value` VARCHAR(64) NULL,
    `Format` VARCHAR(20) NULL,
    `Vendor` VARCHAR(32) NULL,
    `RecommendedOP` VARCHAR(32) NULL,
    `RecommendedTable` VARCHAR(32) NULL,
    `RecommendedHelper` VARCHAR(32) NULL,
    `RecommendedTooltip` VARCHAR(512) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotspots` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `mac` VARCHAR(200) NULL,
    `geocode` VARCHAR(200) NULL,
    `owner` VARCHAR(200) NULL,
    `email_owner` VARCHAR(200) NULL,
    `manager` VARCHAR(200) NULL,
    `email_manager` VARCHAR(200) NULL,
    `address` VARCHAR(200) NULL,
    `company` VARCHAR(200) NULL,
    `phone1` VARCHAR(200) NULL,
    `phone2` VARCHAR(200) NULL,
    `type` VARCHAR(200) NULL,
    `companywebsite` VARCHAR(200) NULL,
    `companyemail` VARCHAR(200) NULL,
    `companycontact` VARCHAR(200) NULL,
    `companyphone` VARCHAR(200) NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `mac`(`mac`),
    INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `batch_id` INTEGER NULL,
    `date` DATETIME(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `status_id` INTEGER NOT NULL DEFAULT 1,
    `type_id` INTEGER NOT NULL DEFAULT 1,
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_id` INTEGER NOT NULL,
    `plan_id` INTEGER NULL,
    `amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `tax_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(32) NOT NULL DEFAULT '',
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(32) NOT NULL DEFAULT '',
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nasname` VARCHAR(128) NOT NULL,
    `shortname` VARCHAR(32) NULL,
    `type` VARCHAR(30) NULL DEFAULT 'other',
    `ports` INTEGER NULL,
    `secret` VARCHAR(60) NOT NULL DEFAULT 'secret',
    `server` VARCHAR(64) NULL,
    `community` VARCHAR(50) NULL,
    `description` VARCHAR(200) NULL DEFAULT 'RADIUS Client',

    INDEX `nasname`(`nasname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `node` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `netid` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `latitude` VARCHAR(20) NOT NULL,
    `longitude` VARCHAR(20) NOT NULL,
    `owner_name` VARCHAR(50) NOT NULL,
    `owner_email` VARCHAR(50) NOT NULL,
    `owner_phone` VARCHAR(25) NOT NULL,
    `owner_address` VARCHAR(100) NOT NULL,
    `approval_status` VARCHAR(1) NOT NULL,
    `ip` VARCHAR(20) NOT NULL,
    `mac` VARCHAR(20) NOT NULL,
    `uptime` VARCHAR(100) NOT NULL,
    `robin` VARCHAR(20) NOT NULL,
    `batman` VARCHAR(20) NOT NULL,
    `memfree` VARCHAR(20) NOT NULL,
    `nbs` MEDIUMTEXT NOT NULL,
    `gateway` VARCHAR(20) NOT NULL,
    `gw-qual` VARCHAR(20) NOT NULL,
    `routes` MEDIUMTEXT NOT NULL,
    `users` CHAR(3) NOT NULL,
    `kbdown` VARCHAR(20) NOT NULL,
    `kbup` VARCHAR(20) NOT NULL,
    `hops` VARCHAR(3) NOT NULL,
    `rank` VARCHAR(3) NOT NULL,
    `ssid` VARCHAR(20) NOT NULL,
    `pssid` VARCHAR(20) NOT NULL,
    `gateway_bit` BOOLEAN NOT NULL,
    `memlow` VARCHAR(20) NOT NULL,
    `usershi` CHAR(3) NOT NULL,
    `cpu` FLOAT NOT NULL DEFAULT 0,
    `wan_iface` VARCHAR(128) NULL,
    `wan_ip` VARCHAR(128) NULL,
    `wan_mac` VARCHAR(128) NULL,
    `wan_gateway` VARCHAR(128) NULL,
    `wifi_iface` VARCHAR(128) NULL,
    `wifi_ip` VARCHAR(128) NULL,
    `wifi_mac` VARCHAR(128) NULL,
    `wifi_ssid` VARCHAR(128) NULL,
    `wifi_key` VARCHAR(128) NULL,
    `wifi_channel` VARCHAR(128) NULL,
    `lan_iface` VARCHAR(128) NULL,
    `lan_mac` VARCHAR(128) NULL,
    `lan_ip` VARCHAR(128) NULL,
    `wan_bup` VARCHAR(128) NULL,
    `wan_bdown` VARCHAR(128) NULL,
    `firmware` VARCHAR(128) NULL,
    `firmware_revision` VARCHAR(128) NULL,

    UNIQUE INDEX `mac`(`mac`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    `firstname` VARCHAR(32) NOT NULL,
    `lastname` VARCHAR(32) NOT NULL,
    `title` VARCHAR(32) NOT NULL,
    `department` VARCHAR(32) NOT NULL,
    `company` VARCHAR(32) NOT NULL,
    `phone1` VARCHAR(32) NOT NULL,
    `phone2` VARCHAR(32) NOT NULL,
    `email1` VARCHAR(32) NOT NULL,
    `email2` VARCHAR(32) NOT NULL,
    `messenger1` VARCHAR(32) NOT NULL,
    `messenger2` VARCHAR(32) NOT NULL,
    `notes` VARCHAR(128) NOT NULL,
    `lastlogin` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operators_acl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operator_id` INTEGER NOT NULL,
    `file` VARCHAR(128) NOT NULL,
    `access` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operators_acl_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file` VARCHAR(128) NOT NULL,
    `category` VARCHAR(128) NOT NULL,
    `section` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_id` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `date` DATETIME(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `type_id` INTEGER NOT NULL DEFAULT 1,
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(32) NOT NULL DEFAULT '',
    `notes` VARCHAR(128) NOT NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxys` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `proxyname` VARCHAR(128) NULL,
    `retry_delay` INTEGER NULL,
    `retry_count` INTEGER NULL,
    `dead_time` INTEGER NULL,
    `default_fallback` INTEGER NULL,
    `creationdate` DATETIME(0) NULL,
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL,
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radacct` (
    `radacctid` BIGINT NOT NULL AUTO_INCREMENT,
    `acctsessionid` VARCHAR(64) NOT NULL DEFAULT '',
    `acctuniqueid` VARCHAR(32) NOT NULL DEFAULT '',
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `realm` VARCHAR(64) NULL DEFAULT '',
    `nasipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `nasportid` VARCHAR(100) NULL,
    `nasporttype` VARCHAR(32) NULL,
    `acctstarttime` DATETIME(0) NULL,
    `acctupdatetime` DATETIME(0) NULL,
    `acctstoptime` DATETIME(0) NULL,
    `acctinterval` INTEGER NULL,
    `acctsessiontime` INTEGER UNSIGNED NULL,
    `acctauthentic` VARCHAR(32) NULL,
    `connectinfo_start` VARCHAR(50) NULL,
    `connectinfo_stop` VARCHAR(50) NULL,
    `acctinputoctets` BIGINT NULL,
    `acctoutputoctets` BIGINT NULL,
    `calledstationid` VARCHAR(50) NOT NULL DEFAULT '',
    `callingstationid` VARCHAR(50) NOT NULL DEFAULT '',
    `acctterminatecause` VARCHAR(32) NOT NULL DEFAULT '',
    `servicetype` VARCHAR(32) NULL,
    `framedprotocol` VARCHAR(32) NULL,
    `framedipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `framedipv6address` VARCHAR(45) NOT NULL DEFAULT '',
    `framedipv6prefix` VARCHAR(45) NOT NULL DEFAULT '',
    `framedinterfaceid` VARCHAR(44) NOT NULL DEFAULT '',
    `delegatedipv6prefix` VARCHAR(45) NOT NULL DEFAULT '',

    UNIQUE INDEX `acctuniqueid`(`acctuniqueid`),
    INDEX `acctinterval`(`acctinterval`),
    INDEX `acctsessionid`(`acctsessionid`),
    INDEX `acctsessiontime`(`acctsessiontime`),
    INDEX `acctstarttime`(`acctstarttime`),
    INDEX `acctstoptime`(`acctstoptime`),
    INDEX `delegatedipv6prefix`(`delegatedipv6prefix`),
    INDEX `framedinterfaceid`(`framedinterfaceid`),
    INDEX `framedipaddress`(`framedipaddress`),
    INDEX `framedipv6address`(`framedipv6address`),
    INDEX `framedipv6prefix`(`framedipv6prefix`),
    INDEX `nasipaddress`(`nasipaddress`),
    INDEX `username`(`username`),
    PRIMARY KEY (`radacctid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radcheck` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `attribute` VARCHAR(64) NOT NULL DEFAULT '',
    `op` CHAR(2) NOT NULL DEFAULT '==',
    `value` VARCHAR(253) NOT NULL DEFAULT '',

    INDEX `username`(`username`(32)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radgroupcheck` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(64) NOT NULL DEFAULT '',
    `attribute` VARCHAR(64) NOT NULL DEFAULT '',
    `op` CHAR(2) NOT NULL DEFAULT '==',
    `value` VARCHAR(253) NOT NULL DEFAULT '',

    INDEX `groupname`(`groupname`(32)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radgroupreply` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(64) NOT NULL DEFAULT '',
    `attribute` VARCHAR(64) NOT NULL DEFAULT '',
    `op` CHAR(2) NOT NULL DEFAULT '=',
    `value` VARCHAR(253) NOT NULL DEFAULT '',

    INDEX `groupname`(`groupname`(32)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radhuntgroup` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(64) NOT NULL DEFAULT '',
    `nasipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `nasportid` VARCHAR(15) NULL,

    INDEX `nasipaddress`(`nasipaddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radippool` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `pool_name` VARCHAR(30) NOT NULL,
    `framedipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `nasipaddress` VARCHAR(15) NOT NULL DEFAULT '',
    `calledstationid` VARCHAR(30) NOT NULL,
    `callingstationid` VARCHAR(30) NOT NULL,
    `expiry_time` DATETIME(0) NULL,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `pool_key` VARCHAR(30) NOT NULL,

    INDEX `framedipaddress`(`framedipaddress`),
    INDEX `radippool_nasip_poolkey_ipaddress`(`nasipaddress`, `pool_key`, `framedipaddress`),
    INDEX `radippool_poolname_expire`(`pool_name`, `expiry_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radpostauth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `pass` VARCHAR(64) NOT NULL DEFAULT '',
    `reply` VARCHAR(32) NOT NULL DEFAULT '',
    `authdate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radreply` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `attribute` VARCHAR(64) NOT NULL DEFAULT '',
    `op` CHAR(2) NOT NULL DEFAULT '=',
    `value` VARCHAR(253) NOT NULL DEFAULT '',

    INDEX `username`(`username`(32)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `radusergroup` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `groupname` VARCHAR(64) NOT NULL DEFAULT '',
    `priority` INTEGER NOT NULL DEFAULT 1,

    INDEX `username`(`username`(32)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `realms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `realmname` VARCHAR(128) NULL,
    `type` VARCHAR(32) NULL,
    `authhost` VARCHAR(256) NULL,
    `accthost` VARCHAR(256) NULL,
    `secret` VARCHAR(128) NULL,
    `ldflag` VARCHAR(64) NULL,
    `nostrip` INTEGER NULL,
    `hints` INTEGER NULL,
    `notrealm` INTEGER NULL,
    `creationdate` DATETIME(0) NULL,
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL,
    `updateby` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userbillinfo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NULL,
    `planName` VARCHAR(128) NULL,
    `hotspot_id` INTEGER NULL,
    `hotspotlocation` VARCHAR(32) NULL,
    `contactperson` VARCHAR(200) NULL,
    `company` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `phone` VARCHAR(200) NULL,
    `address` VARCHAR(200) NULL,
    `city` VARCHAR(200) NULL,
    `state` VARCHAR(200) NULL,
    `country` VARCHAR(100) NULL,
    `zip` VARCHAR(200) NULL,
    `paymentmethod` VARCHAR(200) NULL,
    `cash` VARCHAR(200) NULL,
    `creditcardname` VARCHAR(200) NULL,
    `creditcardnumber` VARCHAR(200) NULL,
    `creditcardverification` VARCHAR(200) NULL,
    `creditcardtype` VARCHAR(200) NULL,
    `creditcardexp` VARCHAR(200) NULL,
    `notes` VARCHAR(200) NULL,
    `changeuserbillinfo` VARCHAR(128) NULL,
    `lead` VARCHAR(200) NULL,
    `coupon` VARCHAR(200) NULL,
    `ordertaker` VARCHAR(200) NULL,
    `billstatus` VARCHAR(200) NULL,
    `lastbill` DATE NOT NULL DEFAULT '0000-00-00',
    `nextbill` DATE NOT NULL DEFAULT '0000-00-00',
    `nextinvoicedue` INTEGER NULL,
    `billdue` INTEGER NULL,
    `postalinvoice` VARCHAR(8) NULL,
    `faxinvoice` VARCHAR(8) NULL,
    `emailinvoice` VARCHAR(8) NULL,
    `batch_id` INTEGER NULL,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `planname`(`planName`),
    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userinfo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NULL,
    `firstname` VARCHAR(200) NULL,
    `lastname` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `department` VARCHAR(200) NULL,
    `company` VARCHAR(200) NULL,
    `workphone` VARCHAR(200) NULL,
    `homephone` VARCHAR(200) NULL,
    `mobilephone` VARCHAR(200) NULL,
    `address` VARCHAR(200) NULL,
    `city` VARCHAR(200) NULL,
    `state` VARCHAR(200) NULL,
    `country` VARCHAR(100) NULL,
    `zip` VARCHAR(200) NULL,
    `notes` VARCHAR(200) NULL,
    `changeuserinfo` VARCHAR(128) NULL,
    `portalloginpassword` VARCHAR(128) NULL DEFAULT '',
    `enableportallogin` INTEGER NULL DEFAULT 0,
    `creationdate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `creationby` VARCHAR(128) NULL,
    `updatedate` DATETIME(0) NULL DEFAULT '0000-00-00 00:00:00',
    `updateby` VARCHAR(128) NULL,

    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wimax` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(64) NOT NULL DEFAULT '',
    `authdate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `spi` VARCHAR(16) NOT NULL DEFAULT '',
    `mipkey` VARCHAR(400) NOT NULL DEFAULT '',
    `lifetime` INTEGER NULL,

    INDEX `spi`(`spi`),
    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
