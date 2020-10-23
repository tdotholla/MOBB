import React, { useState } from "react";
import {
  MenuItem,
  Menu,
  IconButton,
  Switch,
  Badge,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LocationOffIcon from "@material-ui/icons/LocationOffTwoTone";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    // width: "300px",
    // margin: "1rem",
  },
  badge: { float: "right" },
});

const CategoryFilter = ({
  listings,
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleChange = (event) => {
    const newSet = new Set(selectedCategories);
    if (selectedCategories.has(event.target.name)) {
      newSet.delete(event.target.name);
      setSelectedCategories(newSet);
    } else {
      newSet.add(event.target.name);
      setSelectedCategories(newSet);
    }
  };
  const handleFilterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };
  const catCount = (name) => {
    return Object.values(listings).filter((el) => el.categories?.includes(name))
      .length;
  };
  return (
    <div>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={(e) => handleFilterMenuOpen(e)}
      >
        <LocationOffIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={"map-filter-menu"}
        className={classes.root}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={() => handleFilterMenuClose()}
      >
        {categories?.length === 0 ? (
          <LinearProgress />
        ) : (
          categories.map((name) => (
            <MenuItem key={name} value={name}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedCategories.has(name)}
                      onChange={(e) => handleChange(e)}
                      name={name}
                    />
                  }
                  label={name}
                />
              </FormGroup>
              <Badge
                color="primary"
                badgeContent={catCount(name)}
                max={999}
                className={classes.badge}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default CategoryFilter;
