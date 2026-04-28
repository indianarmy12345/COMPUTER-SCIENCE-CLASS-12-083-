import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xii/networks")({
  head: () => ({
    meta: [
      { title: "Computer Networks — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Networking basics, transmission media, devices, topologies, network types (PAN/LAN/MAN/WAN), protocols and web services.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/networks">
      <Section title="Evolution of networking">
        <p>
          <b>ARPANET</b> (1969, US Defense) → <b>NSFNET</b> (1980s, academic) →{" "}
          <b>INTERNET</b> (today, global). Networks let computers share data and
          resources.
        </p>
      </Section>

      <Section title="Data communication terms">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Components: <b>sender, receiver, message, medium, protocol</b>.
          </li>
          <li>
            <b>Bandwidth</b> = max data a channel can carry; <b>Data transfer rate</b>{" "}
            = actual bits/second.
          </li>
          <li>
            <b>IP address</b> uniquely identifies a device on a network (e.g.{" "}
            <code>192.168.1.5</code>).
          </li>
          <li>
            Switching: <b>Circuit</b> (dedicated path, like a phone call) vs{" "}
            <b>Packet</b> (data split into packets, used by the Internet).
          </li>
        </ul>
      </Section>

      <Section title="Transmission media">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Wired:</b> Twisted pair (LAN cable), Coaxial (cable TV), Fiber-optic
            (fastest, used in backbone Internet).
          </li>
          <li>
            <b>Wireless:</b> Radio waves (Wi-Fi, FM), Microwaves (mobile towers),
            Infrared (TV remote).
          </li>
        </ul>
      </Section>

      <Section title="Network devices">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Modem</b> — converts digital ↔ analog (your ISP box).
          </li>
          <li>
            <b>Repeater</b> — boosts a weak signal.
          </li>
          <li>
            <b>Hub</b> — broadcasts to all devices; <b>Switch</b> — sends only to the
            right port.
          </li>
          <li>
            <b>Router</b> — connects two different networks (your home Wi-Fi router).
          </li>
          <li>
            <b>Gateway</b> — connects networks using different protocols.
          </li>
        </ul>
      </Section>

      <Section title="Topologies & network types">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Bus</b> — single backbone cable. <b>Star</b> — all nodes connect to a
            central hub/switch (most common in offices). <b>Tree</b> — hierarchy of
            stars.
          </li>
          <li>
            <b>PAN</b> (Bluetooth headphones) → <b>LAN</b> (school lab) → <b>MAN</b>{" "}
            (city cable network) → <b>WAN</b> (Internet).
          </li>
        </ul>
      </Section>

      <Section title="Protocols & web services">
        <p>
          <b>HTTP/HTTPS</b> — web pages. <b>FTP</b> — file transfer. <b>SMTP</b> — send
          email. <b>POP3</b> — receive email. <b>TCP/IP</b> — the language of the
          Internet. <b>VoIP</b> — voice over IP (WhatsApp call). <b>TELNET</b> — remote
          terminal.
        </p>
        <Callout>
          When you type <code>www.cbse.gov.in</code>, DNS converts the domain name to
          an IP address, your browser sends an HTTPS request, and the web server
          returns the HTML page.
        </Callout>
      </Section>
    </ChapterLayout>
  );
}
