-- DROP TABLE tdwgCodes;
-- DROP TABLE countryCodes;

-- CREATE TABLE tdwgCodes (
-- 	id SERIAL PRIMARY KEY,
-- 	level CHAR(2),
-- 	tdwgCode VARCHAR(8),
-- 	wgsrpdName VARCHAR(85)
-- );

-- SELECT code, wgsrpdName FROM tdwgCodes WHERE level='L3';

-- CREATE TABLE countryCodes (
-- 	id SERIAL PRIMARY KEY,
-- 	countryCode CHAR(2),
-- 	countryName VARCHAR(85)
-- );

-- SELECT tdwgCode, countryCode, countryName
-- FROM tdwgCodes
-- INNER JOIN countryCodes
-- ON countryCodes.countryName = tdwgCodes.WGSRPDName;

-- SELECT tdwgCode, countryCode, countryName
-- FROM tdwgCodes
-- INNER JOIN countryCodes
-- ON tdwgCodes.WGSRPDName LIKE '%' || countryCodes.countryName || '%';

-- SELECT tdwgCode, WGSRPDName, countryCode, countryName
-- FROM tdwgCodes
-- LEFT JOIN countryCodes
-- ON tdwgCodes.WGSRPDName LIKE '%' || countryCodes.countryName || '%'
-- WHERE level = 'L3';

-- drop table tdwgAndCountryCodes;

-- SELECT tdwgCodes.id, tdwgCode, WGSRPDName, countryCode, countryName
-- INTO tdwgAndCountryCodes
-- FROM tdwgCodes
-- INNER JOIN countryCodes
-- ON tdwgCodes.WGSRPDName LIKE '%' || countryCodes.countryName || '%';

-- INSERT INTO tdwgAndCountryCodes (tdwgCode, WGSRPDName,countryCode,countryName) VALUES ( 'SVA','Svalbard','NO','Norway' )

-- ALTER TABLE tdwgAndCountryCodes ALTER COLUMN countryCode TYPE VARCHAR(8);