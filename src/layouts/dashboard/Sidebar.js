import { Avatar, Box, Divider, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import React, { useState } from 'react'
import AntSwitch from './AntSwitch';

const Sidebar = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  return (
    <Box
          p={2}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            height: "100vh",
            width: "100px",
          }}>
          <Stack
            direction="column"
            spacing={3}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ height: "100%" }}>
            <Stack alignItems={"center"} spacing={4}>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}>
                <img src={logo} alt="Img" />
              </Box>
              <Stack
                sx={{ width: "max-content" }}
                direction="column"
                alignItems="center"
                spacing={3}>
                {Nav_Buttons.map((el) =>
                  el.index === selected ? (
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                      }}>
                      <IconButton
                        sx={{ width: "max-content", color: "#fff" }}
                        key={el.index}>
                        {el.icon}
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      onClick={() => setSelected(el.index)}
                      sx={{
                        width: "max-content",
                        color: theme.palette.mode === "light" ? "#000" : "#fff",
                      }}
                      key={el.index}>
                      {el.icon}
                    </IconButton>
                  )
                )}
                <Divider orientation="horizontal" style={{ width: "100%" }} />
                {selected === 3 ? (
                  <Box
                    p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}>
                    <IconButton sx={{ width: "max-content", color: "#fff" }}>
                      <Gear />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => setSelected(3)}
                    sx={{
                      width: "max-content",
                      color: theme.palette.mode === "light" ? "#000" : "#fff",
                    }}>
                    <Gear />
                  </IconButton>
                )}
              </Stack>
            </Stack>

            <Stack spacing={4}>
              <AntSwitch
                onChange={() => {
                  onToggleMode();
                }}
                defaultChecked
              />
              <Avatar src={faker.image.avatar()} />
            </Stack>
          </Stack>
        </Box>
  )
}

export default Sidebar